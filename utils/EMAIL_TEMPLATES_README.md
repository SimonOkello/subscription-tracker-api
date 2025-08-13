# Email Templates Documentation

This documentation covers the comprehensive email template system for the Subscription Tracker application.

## Overview

The email template system provides professionally designed, responsive email templates for various user interactions and notifications. All templates feature a consistent brand design with gradient styling and mobile-responsive layouts.

## Files Structure

```
utils/
├── email-template.js     # Core email templates
├── email-service.js      # Email service helper class
└── EMAIL_TEMPLATES_README.md  # This documentation
```

## Available Templates

### 1. Welcome Email Template
**Function:** `welcomeTemplate(userName, userEmail)`

Sent to new users after successful registration.

**Parameters:**
- `userName` (string): User's display name
- `userEmail` (string): User's email address

**Features:**
- Welcome message with user's name
- Account creation confirmation
- Next steps guidance
- Call-to-action button to dashboard

**Usage:**
```javascript
import { welcomeTemplate } from './email-template.js';

const template = welcomeTemplate("John Doe", "john@example.com");
```

### 2. Subscription Reminder Template
**Function:** `subscriptionReminderTemplate(userName, subscription)`

Reminds users of upcoming subscription payments.

**Parameters:**
- `userName` (string): User's display name
- `subscription` (object): Subscription details
  - `name` (string): Subscription service name
  - `amount` (number): Payment amount
  - `currency` (string): Currency symbol (default: "$")
  - `renewalDate` (Date): Next payment date
  - `category` (string): Subscription category

**Features:**
- Payment due date highlighting
- Subscription details card
- Management link
- Warning styling for urgency

**Usage:**
```javascript
const subscription = {
    name: "Netflix Premium",
    amount: 15.99,
    currency: "$",
    renewalDate: new Date("2024-02-15"),
    category: "Entertainment"
};

const template = subscriptionReminderTemplate("Jane Smith", subscription);
```

### 3. Password Reset Template
**Function:** `passwordResetTemplate(userName, resetToken, expiresIn)`

Provides secure password reset functionality.

**Parameters:**
- `userName` (string): User's display name
- `resetToken` (string): Secure reset token
- `expiresIn` (number): Token expiration time in minutes (default: 15)

**Features:**
- Secure reset link
- Expiration warning
- Security best practices
- Fallback URL for accessibility

**Usage:**
```javascript
const template = passwordResetTemplate("Mike Johnson", "reset-token-123", 15);
```

### 4. Monthly Report Template
**Function:** `monthlyReportTemplate(userName, report)`

Delivers comprehensive monthly spending analytics.

**Parameters:**
- `userName` (string): User's display name
- `report` (object): Report data
  - `month` (number): Report month (1-12)
  - `year` (number): Report year
  - `totalSpent` (number): Total monthly spending
  - `subscriptions` (array): Active subscriptions list
  - `savings` (number): Money saved
  - `newSubscriptions` (number): New subscriptions count
  - `cancelledSubscriptions` (number): Cancelled subscriptions count

**Features:**
- Total spending highlight
- Savings celebration
- Active subscriptions overview
- Visual statistics grid

**Usage:**
```javascript
const reportData = {
    month: 1,
    year: 2024,
    totalSpent: 89.97,
    savings: 15.00,
    newSubscriptions: 2,
    cancelledSubscriptions: 1,
    subscriptions: [
        { name: "Spotify", amount: 9.99, currency: "$", category: "Music" }
    ]
};

const template = monthlyReportTemplate("Sarah Wilson", reportData);
```

### 5. Email Verification Template
**Function:** `emailVerificationTemplate(userName, verificationToken)`

Handles email address verification for new accounts.

**Parameters:**
- `userName` (string): User's display name
- `verificationToken` (string): Email verification token

**Features:**
- Clear verification instructions
- Prominent verification button
- Account security emphasis
- Fallback verification URL

**Usage:**
```javascript
const template = emailVerificationTemplate("Alex Brown", "verify-token-456");
```

### 6. Subscription Cancelled Template
**Function:** `subscriptionCancelledTemplate(userName, subscription)`

Confirms successful subscription cancellations.

**Parameters:**
- `userName` (string): User's display name
- `subscription` (object): Cancelled subscription details
  - `name` (string): Service name
  - `amount` (number): Monthly cost
  - `currency` (string): Currency symbol
  - `lastPaymentDate` (Date): Final payment date

**Features:**
- Cancellation confirmation
- Final payment details
- Re-subscription options
- Status update assurance

### 7. Generic Notification Template
**Function:** `notificationTemplate(userName, title, message, type, actionUrl, actionText)`

Flexible template for various notifications.

**Parameters:**
- `userName` (string): User's display name
- `title` (string): Notification title
- `message` (string): Notification content
- `type` (string): Alert type (`info`, `success`, `warning`, `danger`)
- `actionUrl` (string, optional): Action button URL
- `actionText` (string, optional): Action button text

**Features:**
- Color-coded alert styling
- Optional action buttons
- Flexible content structure
- Consistent branding

## Email Service Helper

The `EmailService` class provides a convenient wrapper for sending emails:

```javascript
import emailService from './email-service.js';

// Send welcome email
await emailService.sendWelcomeEmail("user@example.com", "John Doe");

// Send subscription reminder
await emailService.sendSubscriptionReminder("user@example.com", "John Doe", subscriptionData);

// Send password reset
await emailService.sendPasswordResetEmail("user@example.com", "John Doe", "reset-token");
```

## Template Features

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Cross-email client compatibility

### Professional Styling
- Gradient color scheme (#667eea to #764ba2)
- Clean typography (Segoe UI font stack)
- Consistent spacing and layout
- Subtle shadows and rounded corners

### Accessibility
- High contrast text
- Semantic HTML structure
- Alt text for images
- Fallback text versions

### Brand Consistency
- Unified header design
- Consistent button styling
- Professional footer
- Cohesive color palette

## Environment Configuration

Add these environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL (for email links)
FRONTEND_URL=https://your-frontend-domain.com
```

## Integration Examples

### In Authentication Controller
```javascript
// After successful user registration
import emailService from '../utils/email-service.js';

export const signUp = async (req, res) => {
    try {
        // ... user creation logic ...

        // Send welcome email
        await emailService.sendWelcomeEmail(newUser.email, newUser.name);

        // Send verification email if needed
        if (verificationRequired) {
            await emailService.sendEmailVerification(
                newUser.email,
                newUser.name,
                verificationToken
            );
        }

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        // Handle errors
    }
};
```

### In Subscription Controller
```javascript
// Send payment reminders
export const sendPaymentReminders = async () => {
    const upcomingPayments = await getUpcomingPayments();

    for (const payment of upcomingPayments) {
        await emailService.sendSubscriptionReminder(
            payment.user.email,
            payment.user.name,
            payment.subscription
        );
    }
};
```

### Scheduled Jobs (with cron)
```javascript
// Monthly report automation
import cron from 'node-cron';

// Send monthly reports on the 1st of each month at 9 AM
cron.schedule('0 9 1 * *', async () => {
    const users = await getAllActiveUsers();

    for (const user of users) {
        const reportData = await generateMonthlyReport(user._id);
        await emailService.sendMonthlyReport(user.email, user.name, reportData);
    }
});
```

## Error Handling

All email functions include built-in error handling:

```javascript
try {
    await emailService.sendWelcomeEmail(email, name);
    console.log('Email sent successfully');
} catch (error) {
    console.error('Email sending failed:', error.message);
    // Handle failure gracefully - don't block user registration
}
```

## Testing Email Templates

### Development Testing
```javascript
// Test individual templates
import { welcomeTemplate } from './email-template.js';

const testTemplate = welcomeTemplate("Test User", "test@example.com");
console.log(testTemplate.html); // View HTML output
console.log(testTemplate.text); // View text version
```

### Email Preview
Save template HTML to a file and open in browser:
```javascript
import fs from 'fs';

const template = welcomeTemplate("John Doe", "john@example.com");
fs.writeFileSync('preview.html', template.html);
```

## Customization

### Modifying Base Template
Edit the `baseTemplate` function in `email-template.js` to:
- Change color scheme
- Update typography
- Modify layout structure
- Add custom CSS

### Adding New Templates
1. Create new template function following existing patterns
2. Export the function
3. Add corresponding method to EmailService class
4. Update documentation

### Example Custom Template
```javascript
export const customTemplate = (userName, customData) => {
    const content = `
        <h2>Custom Email Title</h2>
        <p>Hi ${userName},</p>
        <p>Your custom content here...</p>
    `;

    return {
        subject: "Custom Email Subject",
        html: baseTemplate("Custom Email", content),
        text: `Hi ${userName}, your custom text version...`
    };
};
```

## Best Practices

1. **Always include text versions** for email clients that don't support HTML
2. **Test across email clients** (Gmail, Outlook, Apple Mail, etc.)
3. **Keep subject lines under 50 characters** for mobile visibility
4. **Use environment variables** for all URLs and sensitive data
5. **Handle errors gracefully** - don't let email failures break user flows
6. **Monitor email deliverability** and bounce rates
7. **Include unsubscribe options** for marketing emails
8. **Validate email addresses** before sending

## Troubleshooting

### Common Issues

**Emails not sending:**
- Check EMAIL_USER and EMAIL_PASSWORD environment variables
- Verify Gmail app password configuration
- Check network connectivity

**Styling issues:**
- Test in multiple email clients
- Verify CSS compatibility with email standards
- Check for HTML validation errors

**Links not working:**
- Verify FRONTEND_URL environment variable
- Test URL generation logic
- Check for proper URL encoding

**Performance issues:**
- Implement email queuing for bulk sends
- Add retry logic for failed sends
- Monitor email service rate limits

## Security Considerations

1. **Token Security**: Use cryptographically secure tokens for reset/verification
2. **URL Validation**: Validate all URLs before including in emails
3. **Rate Limiting**: Implement rate limiting for email sends
4. **Environment Variables**: Never hardcode credentials or URLs
5. **Input Sanitization**: Sanitize all user input in email content
6. **HTTPS Only**: Ensure all email links use HTTPS

## Support

For additional help with email templates:
1. Check the email service logs for error details
2. Review nodemailer documentation for configuration issues
3. Test templates in email preview tools
4. Monitor email delivery rates and user engagement

## Changelog

### Version 1.0.0
- Initial email template system
- 7 core templates implemented
- EmailService helper class
- Comprehensive documentation
- Mobile-responsive design
- Cross-client compatibility
