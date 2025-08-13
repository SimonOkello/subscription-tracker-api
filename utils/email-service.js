// Email service helper with usage examples for subscription tracker
import transporter from "../config/nodemailer.js";
import {
    welcomeTemplate,
    subscriptionReminderTemplate,
    passwordResetTemplate,
    monthlyReportTemplate,
    emailVerificationTemplate,
    subscriptionCancelledTemplate,
    notificationTemplate,
    sendEmail,
} from "./email-template.js";

/**
 * Email service class to handle all email operations
 */
class EmailService {
    constructor() {
        this.transporter = transporter;
    }

    /**
     * Send welcome email to new user
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     */
    async sendWelcomeEmail(userEmail, userName) {
        try {
            const template = welcomeTemplate(userName, userEmail);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Welcome email sent to ${userEmail}`);
            return { success: true, message: "Welcome email sent successfully" };
        } catch (error) {
            console.error("Error sending welcome email:", error);
            throw new Error("Failed to send welcome email");
        }
    }

    /**
     * Send subscription payment reminder
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     * @param {Object} subscription - Subscription details
     */
    async sendSubscriptionReminder(userEmail, userName, subscription) {
        try {
            const template = subscriptionReminderTemplate(userName, subscription);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Subscription reminder sent to ${userEmail} for ${subscription.name}`);
            return { success: true, message: "Subscription reminder sent successfully" };
        } catch (error) {
            console.error("Error sending subscription reminder:", error);
            throw new Error("Failed to send subscription reminder");
        }
    }

    /**
     * Send password reset email
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     * @param {string} resetToken - Password reset token
     * @param {number} expiresIn - Token expiration time in minutes
     */
    async sendPasswordResetEmail(userEmail, userName, resetToken, expiresIn = 15) {
        try {
            const template = passwordResetTemplate(userName, resetToken, expiresIn);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Password reset email sent to ${userEmail}`);
            return { success: true, message: "Password reset email sent successfully" };
        } catch (error) {
            console.error("Error sending password reset email:", error);
            throw new Error("Failed to send password reset email");
        }
    }

    /**
     * Send monthly spending report
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     * @param {Object} reportData - Monthly report data
     */
    async sendMonthlyReport(userEmail, userName, reportData) {
        try {
            const template = monthlyReportTemplate(userName, reportData);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Monthly report sent to ${userEmail}`);
            return { success: true, message: "Monthly report sent successfully" };
        } catch (error) {
            console.error("Error sending monthly report:", error);
            throw new Error("Failed to send monthly report");
        }
    }

    /**
     * Send email verification
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     * @param {string} verificationToken - Email verification token
     */
    async sendEmailVerification(userEmail, userName, verificationToken) {
        try {
            const template = emailVerificationTemplate(userName, verificationToken);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Email verification sent to ${userEmail}`);
            return { success: true, message: "Email verification sent successfully" };
        } catch (error) {
            console.error("Error sending email verification:", error);
            throw new Error("Failed to send email verification");
        }
    }

    /**
     * Send subscription cancellation confirmation
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     * @param {Object} subscription - Cancelled subscription details
     */
    async sendSubscriptionCancelled(userEmail, userName, subscription) {
        try {
            const template = subscriptionCancelledTemplate(userName, subscription);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Subscription cancellation email sent to ${userEmail}`);
            return { success: true, message: "Subscription cancellation email sent successfully" };
        } catch (error) {
            console.error("Error sending subscription cancellation email:", error);
            throw new Error("Failed to send subscription cancellation email");
        }
    }

    /**
     * Send generic notification email
     * @param {string} userEmail - User's email address
     * @param {string} userName - User's name
     * @param {string} title - Notification title
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, warning, danger, info)
     * @param {string} actionUrl - Optional action URL
     * @param {string} actionText - Optional action button text
     */
    async sendNotification(userEmail, userName, title, message, type = "info", actionUrl = null, actionText = "Learn More") {
        try {
            const template = notificationTemplate(userName, title, message, type, actionUrl, actionText);
            await sendEmail(userEmail, template, this.transporter);
            console.log(`Notification email sent to ${userEmail}: ${title}`);
            return { success: true, message: "Notification email sent successfully" };
        } catch (error) {
            console.error("Error sending notification email:", error);
            throw new Error("Failed to send notification email");
        }
    }

    /**
     * Send bulk emails (for newsletters, announcements, etc.)
     * @param {Array} recipients - Array of {email, name} objects
     * @param {string} title - Email title
     * @param {string} message - Email message
     * @param {string} type - Email type
     */
    async sendBulkEmails(recipients, title, message, type = "info") {
        const results = [];

        for (const recipient of recipients) {
            try {
                await this.sendNotification(recipient.email, recipient.name, title, message, type);
                results.push({ email: recipient.email, success: true });
            } catch (error) {
                results.push({ email: recipient.email, success: false, error: error.message });
            }
        }

        return results;
    }
}

// Create and export a singleton instance
const emailService = new EmailService();
export default emailService;

// Example usage functions
export const emailExamples = {
    /**
     * Example: Send welcome email after user registration
     */
    async welcomeNewUser() {
        const user = {
            name: "John Doe",
            email: "john.doe@example.com"
        };

        try {
            await emailService.sendWelcomeEmail(user.email, user.name);
        } catch (error) {
            console.error("Failed to send welcome email:", error);
        }
    },

    /**
     * Example: Send subscription reminder
     */
    async remindSubscriptionPayment() {
        const user = {
            name: "Jane Smith",
            email: "jane.smith@example.com"
        };

        const subscription = {
            name: "Netflix Premium",
            amount: 15.99,
            currency: "$",
            renewalDate: new Date("2024-02-15"),
            category: "Entertainment"
        };

        try {
            await emailService.sendSubscriptionReminder(user.email, user.name, subscription);
        } catch (error) {
            console.error("Failed to send subscription reminder:", error);
        }
    },

    /**
     * Example: Send password reset email
     */
    async sendPasswordReset() {
        const user = {
            name: "Mike Johnson",
            email: "mike.johnson@example.com"
        };

        const resetToken = "abc123def456"; // This would be generated by your auth system

        try {
            await emailService.sendPasswordResetEmail(user.email, user.name, resetToken, 15);
        } catch (error) {
            console.error("Failed to send password reset email:", error);
        }
    },

    /**
     * Example: Send monthly report
     */
    async sendMonthlySpendingReport() {
        const user = {
            name: "Sarah Wilson",
            email: "sarah.wilson@example.com"
        };

        const reportData = {
            month: 1,
            year: 2024,
            totalSpent: 89.97,
            savings: 15.00,
            newSubscriptions: 2,
            cancelledSubscriptions: 1,
            subscriptions: [
                {
                    name: "Spotify Premium",
                    amount: 9.99,
                    currency: "$",
                    category: "Music"
                },
                {
                    name: "Adobe Creative Cloud",
                    amount: 52.99,
                    currency: "$",
                    category: "Software"
                },
                {
                    name: "Disney+",
                    amount: 7.99,
                    currency: "$",
                    category: "Entertainment"
                }
            ]
        };

        try {
            await emailService.sendMonthlyReport(user.email, user.name, reportData);
        } catch (error) {
            console.error("Failed to send monthly report:", error);
        }
    },

    /**
     * Example: Send email verification
     */
    async sendEmailVerification() {
        const user = {
            name: "Alex Brown",
            email: "alex.brown@example.com"
        };

        const verificationToken = "verify123token456"; // Generated by your auth system

        try {
            await emailService.sendEmailVerification(user.email, user.name, verificationToken);
        } catch (error) {
            console.error("Failed to send email verification:", error);
        }
    },

    /**
     * Example: Send subscription cancelled confirmation
     */
    async confirmSubscriptionCancellation() {
        const user = {
            name: "David Lee",
            email: "david.lee@example.com"
        };

        const cancelledSubscription = {
            name: "Hulu Premium",
            amount: 11.99,
            currency: "$",
            lastPaymentDate: new Date("2024-01-15")
        };

        try {
            await emailService.sendSubscriptionCancelled(user.email, user.name, cancelledSubscription);
        } catch (error) {
            console.error("Failed to send cancellation confirmation:", error);
        }
    },

    /**
     * Example: Send generic notification
     */
    async sendGenericNotification() {
        const user = {
            name: "Lisa Garcia",
            email: "lisa.garcia@example.com"
        };

        try {
            await emailService.sendNotification(
                user.email,
                user.name,
                "New Feature Available!",
                "We've just released a new budget tracking feature that will help you save even more money on your subscriptions.",
                "success",
                `${process.env.FRONTEND_URL}/features/budget-tracker`,
                "Try It Now"
            );
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    },

    /**
     * Example: Send bulk announcement
     */
    async sendBulkAnnouncement() {
        const recipients = [
            { name: "User One", email: "user1@example.com" },
            { name: "User Two", email: "user2@example.com" },
            { name: "User Three", email: "user3@example.com" }
        ];

        try {
            const results = await emailService.sendBulkEmails(
                recipients,
                "Important Update",
                "We're updating our terms of service. Please review the changes in your account settings.",
                "warning"
            );

            console.log("Bulk email results:", results);
        } catch (error) {
            console.error("Failed to send bulk emails:", error);
        }
    }
};

// Usage in controllers example:
export const controllerIntegrationExample = {
    // In your auth controller after user registration:
    async afterUserSignup(user) {
        // Send welcome email
        await emailService.sendWelcomeEmail(user.email, user.name);

        // Send email verification if required
        if (user.verificationToken) {
            await emailService.sendEmailVerification(user.email, user.name, user.verificationToken);
        }
    },

    // In your subscription controller for reminders:
    async sendUpcomingPaymentReminders(subscriptions) {
        for (const sub of subscriptions) {
            await emailService.sendSubscriptionReminder(
                sub.user.email,
                sub.user.name,
                sub
            );
        }
    },

    // In your auth controller for password reset:
    async handlePasswordResetRequest(user, resetToken) {
        await emailService.sendPasswordResetEmail(
            user.email,
            user.name,
            resetToken,
            15 // 15 minutes expiration
        );
    }
};
