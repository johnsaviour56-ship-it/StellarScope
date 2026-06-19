import { getRecentTransactions } from '@/lib/stellar';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const transactions = await getRecentTransactions(Math.min(limit, 100));

    return Response.json({
      success: true,
      data: transactions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
