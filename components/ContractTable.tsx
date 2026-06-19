interface ContractTableProps {
  contracts: Array<{
    contractId: string;
    invokedAt: string;
    invocationCount: number;
    lastActivity: string;
  }>;
  title?: string;
}

export function ContractTable({ contracts, title = 'Active Contracts' }: ContractTableProps) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900">
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Contract ID</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Invocations</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-slate-400">
                  No contracts found
                </td>
              </tr>
            ) : (
              contracts.map((contract) => (
                <tr key={contract.contractId} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-sm font-mono text-cyan-400">
                    {contract.contractId.slice(0, 20)}...
                  </td>
                  <td className="p-4 text-sm text-slate-300">
                    <span className="bg-slate-700 px-2 py-1 rounded text-xs">
                      {contract.invocationCount}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {contract.lastActivity 
                      ? new Date(contract.lastActivity).toLocaleString()
                      : 'Unknown'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
