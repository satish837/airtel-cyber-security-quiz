# MongoDB Setup Guide

## Quick Setup for Development

### Option 1: MongoDB Atlas (Recommended - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Get your connection string
6. Add to `.env.local`:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cybersecurity-quiz?retryWrites=true&w=majority
```

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Add to `.env.local`:

```bash
MONGODB_URI=mongodb://localhost:27017/cybersecurity-quiz
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string_here
```

## For Vercel Deployment

1. Go to your Vercel project dashboard
2. Go to Settings > Environment Variables
3. Add `MONGODB_URI` with your MongoDB Atlas connection string
4. Redeploy your application

## Testing

Once MongoDB is configured:
1. Play a quiz game
2. Complete the quiz
3. Your score will be automatically saved
4. Visit `/dashboard` to see the leaderboard

## Troubleshooting

- **"Database not configured"**: MongoDB URI not set
- **"Failed to fetch scores"**: Check MongoDB connection string
- **Connection timeout**: Verify network access in MongoDB Atlas
