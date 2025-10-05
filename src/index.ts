import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({status: "OK", message: "Web Analytics Server is running"});
});

// Analytics endpoints
app.post("/api/analytics/track", async (req, res) => {
    try {
        const {event, userId, sessionId, data} = req.body;

        // Basic validation
        if (!event) {
            return res.status(400).json({error: "Event is required"});
        }

        // Track analytics event (example implementation)
        const analyticsEvent = await prisma.analyticsEvent.create({
            data: {
                event,
                userId,
                sessionId,
                data: data || {},
                timestamp: new Date(),
            },
        });

        res.status(201).json({success: true, id: analyticsEvent.id});
    } catch (error) {
        console.error("Error tracking analytics event:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

app.get("/api/analytics/events", async (req, res) => {
    try {
        const events = await prisma.analyticsEvent.findMany({
            orderBy: {timestamp: "desc"},
            take: 100, // Limit to last 100 events
        });

        res.json(events);
    } catch (error) {
        console.error("Error fetching analytics events:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Received SIGINT, shutting down gracefully");
    await prisma.$disconnect();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("Received SIGTERM, shutting down gracefully");
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`🚀 Web Analytics Server running on port ${port}`);
});

export default app;
