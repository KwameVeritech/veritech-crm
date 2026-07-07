'use client';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
            V
          </div>
          <h1 className="text-2xl font-bold">Veritech CRM</h1>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="/" className="hover:text-blue-100 transition">Overview</a>
          <a href="/contacts" className="hover:text-blue-100 transition">Contacts</a>
          <a href="/companies" className="hover:text-blue-100 transition">Companies</a>
          <a href="/sales" className="hover:text-blue-100 transition">Sales</a>
          <a href="/analytics" className="hover:text-blue-100 transition">Analytics</a>
        </nav>
      </div>
    </header>
  );
}
