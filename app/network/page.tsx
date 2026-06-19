import { StatCard } from '@/components/StatCard';
import { TransactionTable } from '@/components/TransactionTable';
import { getNetworkStats, getRecentLedgers, getRecentTransactions } from '@/lib/stellar';

export const revalidate = 30;

export default async function NetworkPage() {
  const [networkStats, ledgers, transactions] = await Promise.all([
    getNetworkStats(),
    getRecentLedgers(10),
    getRecentTransactions(10),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Network Activity</h1>
        <p className="text-slate-400">Stellar network statistics and recent activity</p>
      </div>

      {/* Network Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Latest Ledger"
            value={networkStats.latestLedger.toLocaleString()}
            description="Current sequence"
          />
          <StatCard
            title="Transactions"
            value={networkStats.transactionCount.toLocaleString()}
            description="In latest ledger"
          />
          <StatCard
            title="Operations"
            value={networkStats.operationCount.toLocaleString()}
            description="In latest ledger"
          />
          <StatCard
            title="Active Accounts"
            value={networkStats.activeAccounts.toLocaleString()}
            description="Recent activity"
          />
        </div>
      </div>

      {/* Ledgers */}
      <div className="mb-8 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Recent Ledgers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900">
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Sequence</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Transactions</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Operations</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Closed At</th>
              </tr>
            </thead>
            <tbody>
              {ledgers.map((ledger: any) => (
                <tr key={ledger.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-sm font-mono text-cyan-400">
                    {ledger.sequence}
                  </td>
                  <td className="p-4 text-sm text-slate-300">
                    {ledger.transaction_count}
                  </td>
                  <td className="p-4 text-sm text-slate-300">
                    {ledger.operation_count}
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(ledger.closed_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <TransactionTable transactions={transactions} title="Recent Transactions" />
      </div>
    </div>
  );
}
