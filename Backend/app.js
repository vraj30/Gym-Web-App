import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all the required fields!",
        });
    }

    try {
        await sendEmail({
            email: "infernot03@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            userEmail: email,
        });
        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
});

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
