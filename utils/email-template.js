// Email template generator for subscription tracker application
import { EMAIL_USER } from "../config/env.js";

/**
 * Base email template wrapper
 * @param {string} title - Email title
 * @param {string} content - HTML content
 * @param {string} footerText - Optional footer text
 * @returns {string} Complete HTML email template
 */
const baseTemplate = (title, content, footerText = "") => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .email-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .email-header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 300;
            }
            .email-body {
                padding: 40px 30px;
            }
            .email-footer {
                background-color: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                font-size: 14px;
                color: #666;
                border-top: 1px solid #eee;
            }
            .btn {
                display: inline-block;
                padding: 12px 24px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                margin: 20px 0;
                transition: all 0.3s ease;
            }
            .btn:hover {
                opacity: 0.9;
                transform: translateY(-1px);
            }
            .alert {
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
            }
            .alert-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            .alert-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
            }
            .alert-danger {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            .subscription-card {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                padding: 20px;
                margin: 15px 0;
            }
            .subscription-card h3 {
                margin-top: 0;
                color: #495057;
            }
            .price {
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
            }
            .text-center {
                text-align: center;
            }
            .text-muted {
                color: #6c757d;
            }
            @media only screen and (max-width: 600px) {
                body {
                    padding: 10px;
                }
                .email-body {
                    padding: 20px;
                }
                .email-header {
                    padding: 20px;
                }
                .email-header h1 {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Subscription Tracker</h1>
            </div>
            <div class="email-body">
                ${content}
            </div>
            <div class="email-footer">
                ${
                    footerText ||
                    `
                    <p>This email was sent from Subscription Tracker</p>
                    <p class="text-muted">If you have any questions, please don't hesitate to contact us.</p>
                `
                }
            </div>
        </div>
    </body>
    </html>
    `;
};

/**
 * Welcome email template for new users
 * @param {string} userName - User's name
 * @param {string} userEmail - User's email
 * @returns {Object} Email template object
 */
export const welcomeTemplate = (userName, userEmail) => {
    const content = `
        <h2>Welcome to Subscription Tracker, ${userName}! 🎉</h2>
        <p>Thank you for joining our community! We're excited to help you manage your subscriptions more effectively.</p>

        <div class="alert alert-success">
            <strong>Your account has been successfully created!</strong><br>
            Email: ${userEmail}
        </div>

        <h3>What's Next?</h3>
        <ul>
            <li>📱 Add your first subscription</li>
            <li>🔔 Set up payment reminders</li>
            <li>📊 Track your spending patterns</li>
            <li>💰 Discover potential savings</li>
        </ul>

        <div class="text-center">
            <a href="${process.env.FRONTEND_URL || "#"}/dashboard" class="btn">Get Started</a>
        </div>

        <p>If you have any questions or need assistance, our support team is here to help!</p>
    `;

    return {
        subject: "Welcome to Subscription Tracker - Let's Get Started!",
        html: baseTemplate("Welcome to Subscription Tracker", content),
        text: `Welcome to Subscription Tracker, ${userName}! Your account has been successfully created with email: ${userEmail}. Start managing your subscriptions today!`,
    };
};

/**
 * Subscription reminder email template
 * @param {string} userName - User's name
 * @param {Object} subscription - Subscription details
 * @returns {Object} Email template object
 */
export const subscriptionReminderTemplate = (userName, subscription) => {
    const { name, amount, currency, renewalDate, category } = subscription;
    const formattedAmount = `${currency || "$"}${amount}`;
    const formattedDate = new Date(renewalDate).toLocaleDateString();

    const content = `
        <h2>Payment Reminder 💳</h2>
        <p>Hi ${userName},</p>
        <p>This is a friendly reminder that your subscription payment is due soon.</p>

        <div class="subscription-card">
            <h3>${name}</h3>
            <p><strong>Category:</strong> ${category || "General"}</p>
            <p><strong>Amount:</strong> <span class="price">${formattedAmount}</span></p>
            <p><strong>Renewal Date:</strong> ${formattedDate}</p>
        </div>

        <div class="alert alert-warning">
            <strong>Action Required:</strong> Please ensure you have sufficient funds in your account or update your payment method if needed.
        </div>

        <div class="text-center">
            <a href="${process.env.FRONTEND_URL || "#"}/subscriptions" class="btn">Manage Subscription</a>
        </div>
    `;

    return {
        subject: `Payment Reminder: ${name} - ${formattedAmount} due ${formattedDate}`,
        html: baseTemplate("Subscription Payment Reminder", content),
        text: `Hi ${userName}, your ${name} subscription of ${formattedAmount} is due on ${formattedDate}. Please ensure your payment method is up to date.`,
    };
};

/**
 * Password reset email template
 * @param {string} userName - User's name
 * @param {string} resetToken - Password reset token
 * @param {number} expiresIn - Token expiration time in minutes
 * @returns {Object} Email template object
 */
export const passwordResetTemplate = (userName, resetToken, expiresIn = 15) => {
    const resetUrl = `${process.env.FRONTEND_URL || ""}/reset-password?token=${resetToken}`;

    const content = `
        <h2>Password Reset Request 🔐</h2>
        <p>Hi ${userName},</p>
        <p>We received a request to reset your password for your Subscription Tracker account.</p>

        <div class="text-center">
            <a href="${resetUrl}" class="btn">Reset Your Password</a>
        </div>

        <div class="alert alert-warning">
            <strong>Important:</strong> This link will expire in ${expiresIn} minutes for security reasons.
        </div>

        <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>

        <p><strong>For your security:</strong></p>
        <ul>
            <li>Never share your password with anyone</li>
            <li>Use a strong, unique password</li>
            <li>Enable two-factor authentication if available</li>
        </ul>

        <p class="text-muted">If you're having trouble clicking the button, copy and paste this URL into your browser:<br>
        ${resetUrl}</p>
    `;

    return {
        subject: "Reset Your Subscription Tracker Password",
        html: baseTemplate("Password Reset Request", content),
        text: `Hi ${userName}, you requested a password reset for your Subscription Tracker account. Click this link to reset your password: ${resetUrl} (expires in ${expiresIn} minutes)`,
    };
};

/**
 * Monthly spending report email template
 * @param {string} userName - User's name
 * @param {Object} report - Monthly report data
 * @returns {Object} Email template object
 */
export const monthlyReportTemplate = (userName, report) => {
    const {
        month,
        year,
        totalSpent,
        subscriptions,
        savings,
        newSubscriptions,
        cancelledSubscriptions,
    } = report;
    const monthName = new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const subscriptionsList = subscriptions
        .map(
            (sub) =>
                `<div class="subscription-card">
            <h4>${sub.name}</h4>
            <p><strong>${sub.currency || "$"}${sub.amount}</strong> - ${sub.category || "General"}</p>
        </div>`,
        )
        .join("");

    const content = `
        <h2>Your ${monthName} Subscription Report 📊</h2>
        <p>Hi ${userName},</p>
        <p>Here's your monthly subscription summary:</p>

        <div class="alert alert-success text-center">
            <h3>Total Spent: <span class="price">$${totalSpent.toFixed(2)}</span></h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div class="text-center">
                <h4>New Subscriptions</h4>
                <p class="price">${newSubscriptions}</p>
            </div>
            <div class="text-center">
                <h4>Cancelled</h4>
                <p class="price">${cancelledSubscriptions}</p>
            </div>
        </div>

        ${
            savings > 0
                ? `
        <div class="alert alert-success">
            <strong>Great job! 🎉</strong> You saved <strong>$${savings.toFixed(2)}</strong> this month by managing your subscriptions wisely.
        </div>
        `
                : ""
        }

        <h3>Active Subscriptions</h3>
        ${subscriptionsList}

        <div class="text-center">
            <a href="${process.env.FRONTEND_URL || "#"}/dashboard" class="btn">View Full Dashboard</a>
        </div>
    `;

    return {
        subject: `Your ${monthName} Subscription Report - $${totalSpent.toFixed(2)} Total`,
        html: baseTemplate("Monthly Subscription Report", content),
        text: `Hi ${userName}, your ${monthName} subscription report: Total spent $${totalSpent.toFixed(2)}, ${newSubscriptions} new subscriptions, ${cancelledSubscriptions} cancelled.`,
    };
};

/**
 * Account verification email template
 * @param {string} userName - User's name
 * @param {string} verificationToken - Email verification token
 * @returns {Object} Email template object
 */
export const emailVerificationTemplate = (userName, verificationToken) => {
    const verificationUrl = `${process.env.FRONTEND_URL || ""}/verify-email?token=${verificationToken}`;

    const content = `
        <h2>Verify Your Email Address ✉️</h2>
        <p>Hi ${userName},</p>
        <p>Thank you for signing up for Subscription Tracker! To complete your registration and secure your account, please verify your email address.</p>

        <div class="text-center">
            <a href="${verificationUrl}" class="btn">Verify Email Address</a>
        </div>

        <div class="alert alert-warning">
            <strong>Important:</strong> You'll need to verify your email before you can access all features of your account.
        </div>

        <p>If you didn't create an account with Subscription Tracker, please ignore this email.</p>

        <p class="text-muted">If you're having trouble clicking the button, copy and paste this URL into your browser:<br>
        ${verificationUrl}</p>
    `;

    return {
        subject: "Verify Your Email - Subscription Tracker",
        html: baseTemplate("Email Verification", content),
        text: `Hi ${userName}, please verify your email address for Subscription Tracker by clicking this link: ${verificationUrl}`,
    };
};

/**
 * Subscription cancelled confirmation email template
 * @param {string} userName - User's name
 * @param {Object} subscription - Cancelled subscription details
 * @returns {Object} Email template object
 */
export const subscriptionCancelledTemplate = (userName, subscription) => {
    const { name, amount, currency, lastPaymentDate } = subscription;
    const formattedAmount = `${currency || "$"}${amount}`;

    const content = `
        <h2>Subscription Cancelled ✅</h2>
        <p>Hi ${userName},</p>
        <p>We've successfully cancelled your subscription as requested.</p>

        <div class="subscription-card">
            <h3>${name}</h3>
            <p><strong>Monthly Cost:</strong> ${formattedAmount}</p>
            <p><strong>Last Payment:</strong> ${new Date(lastPaymentDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span style="color: #dc3545; font-weight: bold;">Cancelled</span></p>
        </div>

        <div class="alert alert-success">
            <strong>Cancellation Confirmed!</strong> You will not be charged again for this subscription.
        </div>

        <p>If you cancelled by mistake or change your mind, you can always re-subscribe later through our platform.</p>

        <div class="text-center">
            <a href="${process.env.FRONTEND_URL || "#"}/subscriptions" class="btn">Manage Other Subscriptions</a>
        </div>
    `;

    return {
        subject: `Subscription Cancelled: ${name}`,
        html: baseTemplate("Subscription Cancelled", content),
        text: `Hi ${userName}, your ${name} subscription (${formattedAmount}) has been successfully cancelled. You will not be charged again.`,
    };
};

/**
 * Generic notification email template
 * @param {string} userName - User's name
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, warning, danger, info)
 * @param {string} actionUrl - Optional action URL
 * @param {string} actionText - Optional action button text
 * @returns {Object} Email template object
 */
export const notificationTemplate = (
    userName,
    title,
    message,
    type = "info",
    actionUrl = null,
    actionText = "Learn More",
) => {
    const alertClass = `alert-${type}`;

    const content = `
        <h2>${title}</h2>
        <p>Hi ${userName},</p>

        <div class="alert ${alertClass}">
            ${message}
        </div>

        ${
            actionUrl
                ? `
        <div class="text-center">
            <a href="${actionUrl}" class="btn">${actionText}</a>
        </div>
        `
                : ""
        }
    `;

    return {
        subject: `Subscription Tracker: ${title}`,
        html: baseTemplate(title, content),
        text: `Hi ${userName}, ${title}: ${message}`,
    };
};

/**
 * Helper function to send email using the configured transporter
 * @param {string} to - Recipient email address
 * @param {Object} template - Email template object
 * @param {Object} transporter - Nodemailer transporter instance
 * @returns {Promise} Send email promise
 */
export const sendEmail = async (to, template, transporter) => {
    const mailOptions = {
        from: `Subscription Tracker <${EMAIL_USER}>`,
        to,
        subject: template.subject,
        html: template.html,
        text: template.text,
    };

    return await transporter.sendMail(mailOptions);
};

// Export all templates as default
export default {
    welcomeTemplate,
    subscriptionReminderTemplate,
    passwordResetTemplate,
    monthlyReportTemplate,
    emailVerificationTemplate,
    subscriptionCancelledTemplate,
    notificationTemplate,
    sendEmail,
};
