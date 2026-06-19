const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || 'https://horizon.stellar.org';

export async function fetchFromHorizon(endpoint: string) {
  try {
    const response = await fetch(`${HORIZON_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 30 } // Cache for 30 seconds
    });

    if (!response.ok) {
      throw new Error(`Horizon API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from Horizon: ${endpoint}`, error);
    throw error;
  }
}

export async function getLatestLedger() {
  const data = await fetchFromHorizon('/ledgers?limit=1&order=desc');
  return data._embedded?.records?.[0];
}

export async function getRecentLedgers(limit = 10) {
  const data = await fetchFromHorizon(`/ledgers?limit=${limit}&order=desc`);
  return data._embedded?.records || [];
}

export async function getRecentTransactions(limit = 10) {
  const data = await fetchFromHorizon(`/transactions?limit=${limit}&order=desc`);
  return data._embedded?.records || [];
}

export async function getNetworkStats() {
  try {
    const ledger = await getLatestLedger();
    
    // Fetch last 100 transactions for statistics
    const txData = await fetchFromHorizon('/transactions?limit=100&order=desc');
    const transactions = txData._embedded?.records || [];

    return {
      latestLedger: ledger?.sequence || 0,
      transactionCount: ledger?.transaction_count || 0,
      operationCount: ledger?.operation_count || 0,
      activeAccounts: transactions.length, // Approximation
    };
  } catch (error) {
    console.error('Error fetching network stats:', error);
    return {
      latestLedger: 0,
      transactionCount: 0,
      operationCount: 0,
      activeAccounts: 0,
    };
  }
}
