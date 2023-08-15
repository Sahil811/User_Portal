/**
 * Email utility class for sending various email notifications to users.
 *
 * This class uses nodemailer to send emails using the configured SMTP settings
 * and pug for rendering email templates from template files.
 *
 * @class Email
 */
import nodemailer from 'nodemailer';
import { User } from '../entities/user.entity';
import config from 'config';
import pug from 'pug';
import { convert } from 'html-to-text';

/**
 * SMTP configuration retrieved from the application's configuration settings.
 *
 * @typedef {object} SmtpConfig
 * @property {string} host - The SMTP server host.
 * @property {number} port - The SMTP server port.
 * @property {string} user - The SMTP authentication username.
 * @property {string} pass - The SMTP authentication password.
 */

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

const smtp = config.get<SmtpConfig>('smtp');

/**
 * Email class that facilitates sending various email notifications to users.
 *
 * @class Email
 */
export default class Email {
  firstName: string;
  to: string;
  from: string;
  /**
   * Create a new Email instance.
   *
   * @constructor
   * @param {User} user - The user to whom the email will be sent.
   * @param {string} url - The URL to include in the email.
   */
  constructor(
    public user: User,
    public url: string,
  ) {
    this.firstName = user.name.split(' ')[0];
    this.to = user.email;
    this.from = `User Portal ${config.get<string>('emailFrom')}`;
  }

  /**
   * Create a new nodemailer transport instance based on the configured SMTP settings.
   *
   * @private
   * @returns {import('nodemailer').Transporter} - A nodemailer transport instance.
   */
  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  /**
   * Send an email using the specified email template and subject.
   *
   * @private
   * @param {string} template - The name of the email template (without the file extension).
   * @param {string} subject - The subject of the email.
   */
  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      subject,
      url: this.url,
    });
    // Create mailOptions
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  /**
   * Send an email containing the user's account verification code.
   */
  async sendVerificationCode() {
    await this.send('verificationCode', 'Your account verification code');
  }

  /**
   * Send an email containing the user's password reset token.
   */
  async sendPasswordResetToken() {
    await this.send('resetPassword', 'Your password reset token (valid for only 10 minutes)');
  }
}
