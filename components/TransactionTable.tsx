interface TransactionTableProps {
  transactions: Array<{
    id: string;
    hash: string;
    source_account: string;
    created_at: string;
    operation_count: number;
  }>;
  title?: string;
}

export function TransactionTable({ transactions, title = 'Recent Transactions' }: TransactionTableProps) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900">
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Hash</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Source Account</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Operations</th>
              <th className="text-left p-4 text-sm font-semibold text-slate-300">Created</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-sm font-mono text-cyan-400">
                    {tx.hash.slice(0, 16)}...
                  </td>
                  <td className="p-4 text-sm font-mono text-slate-300">
                    {tx.source_account.slice(0, 20)}...
                  </td>
                  <td className="p-4 text-sm text-slate-300">
                    {tx.operation_count}
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(tx.created_at).toLocaleString()}
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
