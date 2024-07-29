import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Conditionally include the "Email of sender" part based on the email type
    const emailContent = options.type === 'verification' 
        ? `${options.message}\n\n` 
        : `${options.message}\n\nEmail of sender: ${options.userEmail}`;

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: emailContent,
    };

    await transporter.sendMail(mailOptions);
};
