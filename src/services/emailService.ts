export interface EmailData {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await fetch("https://formspree.io/f/xdappvyj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: data.subject.includes("from") ? data.subject.split("from")[1].trim() : "Contact Form",
        email: data.from || "info@afritradexafrica.com",
        subject: data.subject,
        message: data.text
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send message");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const EMAIL_ADDRESSES = {
  ADMIN: "admin@afritradexafrica.com",
  INFO: "info@afritradexafrica.com",
  INQUIRY: "inquiry@afritradexafrica.com",
  KYC: "kyc@afritradexafrica.com",
  SALES: "sales@afritradexafrica.com",
  SUPPORT: "support@afritradexafrica.com",
};
