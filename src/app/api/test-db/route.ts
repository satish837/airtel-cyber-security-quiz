import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Check environment variables
    const hasMongoUri = !!process.env.MONGODB_URI;
    const nodeEnv = process.env.NODE_ENV;
    
    console.log('Environment check:', {
      hasMongoUri,
      nodeEnv,
      mongoUriLength: process.env.MONGODB_URI?.length || 0
    });

    if (!hasMongoUri) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI environment variable not found',
        environment: nodeEnv
      });
    }

    // Test database connection
    const db = await getDatabase();
    
    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Failed to connect to database',
        hasMongoUri,
        environment: nodeEnv
      });
    }

    // Test a simple operation
    const result = await db.admin().ping();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      ping: result,
      environment: nodeEnv
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV
    });
  }
}
