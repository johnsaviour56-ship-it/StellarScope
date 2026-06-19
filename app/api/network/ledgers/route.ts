import { getRecentLedgers } from '@/lib/stellar';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const ledgers = await getRecentLedgers(Math.min(limit, 100));

    return Response.json({
      success: true,
      data: ledgers,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching ledgers:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch ledgers' },
      { status: 500 }
    );
  }
}
