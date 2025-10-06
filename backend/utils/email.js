const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "laptoptest7788@gmail.com",
    pass: process.env.EMAIL_PASS || "uqfiabjkiqudrgdw",
  },
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, userType = "user") => {
  const isAdmin = userType === "admin";
  const subject = isAdmin
    ? "Admin Password Reset OTP - SkillTwin"
    : "Password Reset OTP - SkillTwin";
  const title = isAdmin ? "Admin Password Reset" : "Password Reset";
  const description = isAdmin
    ? "You requested a password reset for your SkillTwin Admin account. Use the OTP below to verify your identity and create a new password."
    : "You requested a password reset for your SkillTwin account. Use the OTP below to verify your identity and create a new password.";

  const mailOptions = {
    from: process.env.EMAIL_USER || "laptoptest7788@gmail.com",
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">SkillTwin${isAdmin ? " Admin" : ""}</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">${title} Request</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            ${description}
          </p>
          
          <div style="background: #fff; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
            <h3 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Your OTP Code</h3>
            <div style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 5px; font-family: 'Courier New', monospace;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <strong>Important:</strong> This OTP will expire in 10 minutes. If you didn't request this password reset, please ignore this email.
          </p>
          
          <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #1976d2; font-size: 14px;">
              <strong>Security Tip:</strong> Never share this OTP with anyone. SkillTwin will never ask for your OTP via phone or email.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>This email was sent to ${email}</p>
          <p>&copy; 2024 SkillTwin. All rights reserved.</p>
        </div>
      </div>
    `,
  };
  console.log("Camed to transporter");

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  // Sends a generic HTML email to an admin address defined in the environment
  sendAdminNotificationEmail: async (subject, html) => {
    const toAddress = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (!toAddress) {
      console.error("ADMIN_EMAIL/EMAIL_USER not configured. Cannot send admin notification.");
      return false;
    }
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "laptoptest7788@gmail.com",
        to: toAddress,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error("Failed to send admin notification:", error);
      return false;
    }
  },
  // Build a rich HTML template for admin notifications (Inquiry)
  buildInquiryEmailTemplate: (data) => {
    const {
      name = "-",
      email = "-",
      contact = "-",
      tech = "-",
      helpType = "-",
      message,
      submittedAt = new Date().toISOString(),
      downloadUrl,
    } = data || {};

    return `
      <div style="font-family:Inter, -apple-system, Segoe UI, Roboto, Arial, 'Helvetica Neue', Helvetica, 'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'; background:#0b1020; padding:32px;">
        <div style="max-width:640px; margin:0 auto; background:#0f1530; border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.45);">
          <div style="background:linear-gradient(135deg,#3b82f6 0%,#8b5cf6 50%,#ec4899 100%); padding:28px 24px; color:#fff;">
            <div style="font-size:18px; opacity:.9; letter-spacing:.4px;">SkillTwin</div>
            <div style="font-size:26px; font-weight:700; margin-top:4px;">New Inquiry</div>
          </div>

          <div style="padding:28px; color:#e5e7eb;">
            <p style="margin:0 0 18px 0; font-size:15px; color:#cbd5e1;">A new inquiry has been submitted. Details are below.</p>

            <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%; border-collapse:separate; border-spacing:0 10px;">
              <tbody>
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px;">Name</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:8px; font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px;">Email</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:8px;">
                    <a href="mailto:${email}" style="color:#60a5fa; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px;">Phone</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:8px;">${contact}</td>
                </tr>
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px;">Technology</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:8px;">${tech}</td>
                </tr>
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px;">Help Type</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:8px;">${helpType}</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px; vertical-align:top;">Message</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:12px 14px; border-radius:8px; line-height:1.6; white-space:pre-wrap;">${message}</td>
                </tr>` : ''}
                <tr>
                  <td style="width:180px; color:#94a3b8; font-size:13px;">Submitted</td>
                  <td style="background:#0b1020; border:1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:8px; color:#94a3b8;">${submittedAt}</td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top:22px; display:flex; gap:12px;">
              <a href="mailto:${email}" style="display:inline-block; padding:10px 14px; background:linear-gradient(135deg,#3b82f6 0%,#8b5cf6 100%); color:#fff; border-radius:10px; text-decoration:none; font-weight:600; font-size:14px;">Reply to ${name}</a>
              ${downloadUrl ? `<a href="${downloadUrl}" style="display:inline-block; padding:10px 14px; background:#0b1020; color:#cbd5e1; border:1px solid rgba(255,255,255,0.12); border-radius:10px; text-decoration:none; font-weight:600; font-size:14px;">
                <span style="vertical-align:middle; display:inline-block; width:14px; height:14px; margin-right:8px;">
                  <!-- download icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#cbd5e1"><path d="M5 20h14v-2H5v2zm7-18l-5 5h3v6h4V7h3l-5-5z"/></svg>
                </span>
                Download Copy
              </a>` : ''}
            </div>
          </div>

          <div style="padding:18px 24px; background:#0b1020; color:#64748b; font-size:12px; border-top:1px solid rgba(255,255,255,0.06); text-align:center;">
            © ${new Date().getFullYear()} SkillTwin. All rights reserved.
          </div>
        </div>
      </div>
    `;
  },
};
