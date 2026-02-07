import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, age, email, contact, visitDate, location } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"DMCI Homes Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '🏢 New DMCI Homes Inquiry Received',
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #333; line-height: 1.6;">
          
          <h2 style="color: #1e40af;">
            🏠 New Inquiry Submitted
          </h2>

          <p>You have received a new property inquiry with the following details:</p>

          <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">👤 Full Name</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">🎂 Age</td>
              <td style="padding: 8px;">${age}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📧 Email</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📞 Contact Number</td>
              <td style="padding: 8px;">${contact}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📍 Preferred Location</td>
              <td style="padding: 8px;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📅 Preferred Viewing Date</td>
              <td style="padding: 8px;">${visitDate}</td>
            </tr>
          </table>

          <p style="margin-top: 24px;">
            🔔 Please follow up with the client within 24 hours to provide project details
            and confirm the showroom or site viewing.
          </p>

          <hr style="margin: 24px 0;" />

          <p style="font-size: 12px; color: #666;">
            This inquiry was generated automatically from the DMCI Homes website.
          </p>

        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send inquiry email' },
      { status: 500 }
    )
  }
}
