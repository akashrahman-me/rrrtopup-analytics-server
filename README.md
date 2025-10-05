# Web Analytics Server

A web analytics server built with Express, TypeScript, PostgreSQL, and Prisma.

## Features

-   **Express.js** - Fast, unopinionated web framework
-   **TypeScript** - Type-safe JavaScript
-   **PostgreSQL** - Robust relational database
-   **Prisma** - Modern database toolkit and ORM
-   **CORS** - Cross-origin resource sharing
-   **Helmet** - Security middleware

## Prerequisites

-   Node.js (v18 or higher)
-   PostgreSQL database
-   npm or yarn

## Setup

1. **Clone and navigate to the project:**

    ```bash
    cd web-analytics-server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    ```bash
    cp .env.example .env
    ```

    Edit `.env` file with your database connection details.

4. **Set up the database:**

    ```bash
    # Generate Prisma client
    npm run prisma:generate

    # Run database migrations
    npm run prisma:migrate

    # (Optional) Seed the database with sample data
    npm run prisma:seed
    ```

## Development

```bash
# Start development server with hot reloading
npm run dev

# Build the project
npm run build

# Start production server
npm start
```

## API Endpoints

### Health Check

-   `GET /health` - Check if the server is running

### Analytics

-   `POST /api/analytics/track` - Track an analytics event
-   `GET /api/analytics/events` - Get recent analytics events

### Example Usage

Track an event:

```bash
curl -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "event": "page_view",
    "userId": "user123",
    "sessionId": "session456",
    "data": {
      "page": "/home",
      "referrer": "google.com"
    }
  }'
```

## Database Management

```bash
# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

## Environment Variables

| Variable       | Description                  | Default     |
| -------------- | ---------------------------- | ----------- |
| `DATABASE_URL` | PostgreSQL connection string | Required    |
| `PORT`         | Server port                  | 3000        |
| `NODE_ENV`     | Environment mode             | development |

## Project Structure

```
web-analytics-server/
├── src/
│   └── index.ts          # Main application file
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
