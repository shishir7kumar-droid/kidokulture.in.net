import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('kidokulture');
    
    // We store only the path and timestamp to maintain COPPA compliance (no PII)
    await db.collection('visitor_logs').insertOne({
      path,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json({ error: 'Failed to log visit' }, { status: 500 });
  }
}

export async function GET() {
  // Simple summary for internal use
  try {
    const client = await clientPromise;
    const db = client.db('kidokulture');
    
    // Calculate start of today (UTC)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const summary = await db.collection('visitor_logs').aggregate([
      {
        $group: {
          _id: '$path',
          count: { $sum: 1 },
          lastVisit: { $max: '$timestamp' }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();

    const todayCount = await db.collection('visitor_logs').countDocuments({
      timestamp: { $gte: today }
    });

    return NextResponse.json({ summary, todayCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
  }
}
