import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-white">StellarScope</h1>
        </Link>
        
        <nav className="flex gap-6">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/network" className="text-slate-300 hover:text-white transition-colors">
            Network
          </Link>
          <Link href="/contracts" className="text-slate-300 hover:text-white transition-colors">
            Contracts
          </Link>
        </nav>
      </div>
    </header>
  );
}
