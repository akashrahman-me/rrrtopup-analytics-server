import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create some sample users
    const user1 = await prisma.user.create({
        data: {
            email: "user1@example.com",
            name: "John Doe",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: "user2@example.com",
            name: "Jane Smith",
        },
    });

    // Create some sample analytics events
    await prisma.analyticsEvent.create({
        data: {
            event: "page_view",
            userId: user1.id,
            sessionId: "session_123",
            data: {
                page: "/home",
                referrer: "google.com",
            },
        },
    });

    await prisma.analyticsEvent.create({
        data: {
            event: "button_click",
            userId: user2.id,
            sessionId: "session_456",
            data: {
                button_id: "signup_btn",
                page: "/landing",
            },
        },
    });

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
