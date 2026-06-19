import { getRecentContracts } from '@/lib/soroban';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const contracts = await getRecentContracts(Math.min(limit, 100));

    return Response.json({
      success: true,
      data: contracts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch contracts' },
      { status: 500 }
    );
  }
}
