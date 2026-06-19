const SOROBAN_RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org';

export interface SorobanEvent {
  type: string;
  contract: string;
  created_at: string;
  id: string;
}

export async function fetchFromSoroban(method: string, params: any = {}) {
  try {
    const response = await fetch(SOROBAN_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params,
      }),
      next: { revalidate: 30 }
    });

    if (!response.ok) {
      throw new Error(`Soroban RPC error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Soroban RPC error: ${data.error.message}`);
    }

    return data.result;
  } catch (error) {
    console.error(`Error fetching from Soroban: ${method}`, error);
    throw error;
  }
}

export async function getRecentContracts(limit = 20) {
  try {
    // Get events (contract invocations) from Soroban
    const events = await fetchFromSoroban('getEvents', {
      filters: [
        {
          type: 'contract',
          contractIds: [], // Empty means all contracts
        }
      ],
      limit,
      startLedger: 0,
    });

    // Group events by contract ID
    const contractMap = new Map<string, { count: number; lastActivity: string }>();

    if (Array.isArray(events)) {
      events.forEach((event: any) => {
        const contractId = event.contractId || 'unknown';
        const current = contractMap.get(contractId) || { count: 0, lastActivity: '' };
        contractMap.set(contractId, {
          count: current.count + 1,
          lastActivity: event.ledgerCloseTime || current.lastActivity,
        });
      });
    }

    // Convert to sorted array
    return Array.from(contractMap.entries())
      .map(([contractId, data]) => ({
        contractId,
        invokedAt: data.lastActivity,
        invocationCount: data.count,
        lastActivity: data.lastActivity,
      }))
      .sort((a, b) => b.invocationCount - a.invocationCount);
  } catch (error) {
    console.error('Error fetching recent contracts:', error);
    return [];
  }
}

export async function getSorobanStats() {
  try {
    const contracts = await getRecentContracts(50);
    return {
      activeContractsCount: contracts.length,
      recentContracts: contracts.slice(0, 20),
    };
  } catch (error) {
    console.error('Error fetching Soroban stats:', error);
    return {
      activeContractsCount: 0,
      recentContracts: [],
    };
  }
}
