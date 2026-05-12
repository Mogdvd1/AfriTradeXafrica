import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // SendGrid API Key initialization
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (sendgridApiKey) {
    sgMail.setApiKey(sendgridApiKey);
  }

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-email", async (req, res) => {
    const { to, from, subject, text, html } = req.body;

    if (!sendgridApiKey) {
      return res.status(500).json({ error: "SendGrid API key not configured" });
    }

    const msg = {
      to,
      from: from || "info@afritradexafrica.com", // Default sender
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      res.json({ success: true });
    } catch (error: any) {
      console.error("SendGrid Error:", error);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
