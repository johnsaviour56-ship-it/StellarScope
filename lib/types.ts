// Network types
export interface Ledger {
  id: string;
  paging_token: string;
  sequence: number;
  transaction_count: number;
  operation_count: number;
  closed_at: string;
  total_coins: string;
  fee_pool: string;
  base_fee_in_stroops: number;
  base_reserve_in_stroops: number;
}

export interface Transaction {
  id: string;
  hash: string;
  paging_token: string;
  ledger_attr: number;
  created_at: string;
  source_account: string;
  operation_count: number;
  successful: boolean;
}

export interface Operation {
  id: string;
  type: string;
  created_at: string;
  source_account: string;
}

export interface NetworkStats {
  latestLedger: number;
  transactionCount: number;
  operationCount: number;
  activeAccounts: number;
}

// Soroban types
export interface SorobanContract {
  contractId: string;
  invokedAt: string;
  invocationCount: number;
  lastActivity: string;
}

export interface SorobanStats {
  activeContractsCount: number;
  recentContracts: SorobanContract[];
}

// Dashboard types
export interface DashboardData {
  network: NetworkStats;
  soroban: SorobanStats;
  lastUpdated: string;
}
