import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async (email, emailType, userID) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);
        
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        } else if (emailType === "FORGOT") {
            await User.findByIdAndUpdate(userID, {
                resetToken: hashedToken,
                resetTokenExpiry: Date.now() + 3600000 // 1 hour
            }); 
        }
    
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "00b136a9692961",
            pass: "7c254c17f3e558"
        }
        });
        
        const mailOptions = {
            from: 'deshmukhrohit373@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your account" : "Reset your password",
            html: emailType === "VERIFY" ? 
                `<p>Click <a href="${process.env.domain}/verify/${hashedToken}">here</a> to verify your account.</p>` : 
                `<p>Click <a href="${process.env.domain}/reset/${hashedToken}">here</a> to reset your password.</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error) {
        throw new Error("Error sending email : ", error.message);
    }
}