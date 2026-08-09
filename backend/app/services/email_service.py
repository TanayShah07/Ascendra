import smtplib
from email.message import EmailMessage

from app.config.settings import settings


def send_otp_email(
    recipient_email: str,
    otp: str
):

    message = EmailMessage()

    message["Subject"] = "Ascendra - Password Reset OTP"

    message["From"] = "Ascendra"

    message["To"] = recipient_email

    message.set_content(
        f"""
Hello,

You requested to reset your Ascendra password.

Your OTP is:

{otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, you can safely ignore this email.

Regards,
Ascendra Team
"""
    )

    with smtplib.SMTP(
        settings.SMTP_HOST,
        settings.SMTP_PORT
    ) as server:

        server.starttls()

        server.login(
            settings.SMTP_USERNAME,
            settings.SMTP_PASSWORD
        )

        server.send_message(message)