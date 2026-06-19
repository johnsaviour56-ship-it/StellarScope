import { StatCard } from '@/components/StatCard';
import { ActivityChart } from '@/components/ActivityChart';
import { ContractTable } from '@/components/ContractTable';
import { getNetworkStats } from '@/lib/stellar';
import { getSorobanStats } from '@/lib/soroban';

export const revalidate = 30; // Revalidate every 30 seconds

async function generateChartData() {
  // Generate mock chart data for activity over the last 7 days
  const now = new Date();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 5000) + 1000,
    });
  }
  
  return data;
}

export default async function Home() {
  const [networkStats, sorobanStats, chartData] = await Promise.all([
    getNetworkStats(),
    getSorobanStats(),
    generateChartData(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Real-time overview of Stellar network and Soroban activity</p>
      </div>

      {/* Network Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Network Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Latest Ledger"
            value={networkStats.latestLedger.toLocaleString()}
            description="Current ledger sequence"
          />
          <StatCard
            title="Transactions"
            value={networkStats.transactionCount.toLocaleString()}
            description="In latest ledger"
          />
          <StatCard
            title="Operations"
            value={networkStats.operationCount.toLocaleString()}
            description="Recent activity"
          />
          <StatCard
            title="Active Accounts"
            value={networkStats.activeAccounts.toLocaleString()}
            description="Last 100 transactions"
          />
        </div>
      </div>

      {/* Soroban Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Soroban Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Contracts"
            value={sorobanStats.activeContractsCount}
            description="Recently invoked"
          />
        </div>
      </div>

      {/* Activity Chart */}
      <div className="mb-8">
        <ActivityChart
          data={chartData}
          title="Network Activity (Last 7 Days)"
          height={300}
        />
      </div>

      {/* Recent Contracts */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recently Active Contracts</h2>
        <ContractTable contracts={sorobanStats.recentContracts.slice(0, 10)} />
      </div>
    </div>
  );
}
