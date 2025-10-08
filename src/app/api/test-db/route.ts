import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Check environment variables
    const hasMongoUri = !!process.env.MONGODB_URI;
    const nodeEnv = process.env.NODE_ENV;
    const mongoUriPreview = process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.substring(0, 20) + '...' : 'Not set';
    
    console.log('Environment check:', {
      hasMongoUri,
      nodeEnv,
      mongoUriLength: process.env.MONGODB_URI?.length || 0,
      mongoUriPreview
    });

    const response = {
      success: false,
      environment: nodeEnv,
      hasMongoUri,
      mongoUriLength: process.env.MONGODB_URI?.length || 0,
      mongoUriPreview,
      timestamp: new Date().toISOString()
    };

    if (!hasMongoUri) {
      return NextResponse.json({
        ...response,
        error: 'MONGODB_URI environment variable not found'
      });
    }

    // Test database connection with timeout
    try {
      const db = await Promise.race([
        getDatabase(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database connection timeout')), 10000)
        )
      ]);
      
      if (!db) {
        return NextResponse.json({
          ...response,
          error: 'Failed to connect to database - getDatabase returned null'
        });
      }

      // Test a simple operation - just check if we can access the database
      const collections = await (db as any).listCollections().toArray();
      
      return NextResponse.json({
        ...response,
        success: true,
        message: 'Database connection successful',
        collectionsCount: collections.length
      });

    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({
        ...response,
        error: `Database connection failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`
      });
    }

  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  }
}
