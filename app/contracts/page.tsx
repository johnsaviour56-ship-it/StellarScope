import { StatCard } from '@/components/StatCard';
import { ContractTable } from '@/components/ContractTable';
import { getSorobanStats } from '@/lib/soroban';

export const revalidate = 30;

export default async function ContractsPage() {
  const sorobanStats = await getSorobanStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Soroban Contracts</h1>
        <p className="text-slate-400">Recently active Soroban smart contracts</p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Contracts"
            value={sorobanStats.activeContractsCount}
            description="Recently invoked"
          />
        </div>
      </div>

      {/* Contracts Table */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <ContractTable 
          contracts={sorobanStats.recentContracts} 
          title="All Active Contracts"
        />
      </div>
    </div>
  );
}
