'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>
          <span style={styles.logoText}>Veritech CRM</span>
        </Link>
        <nav style={styles.nav}>
          <Link
            href="/"
            style={{
              ...styles.navLink,
              ...(isActive('/') ? styles.navLinkActive : {}),
            }}
          >
            Overview
          </Link>
          <Link
            href="/contacts"
            style={{
              ...styles.navLink,
              ...(isActive('/contacts') ? styles.navLinkActive : {}),
            }}
          >
            Contacts
          </Link>
          <Link
            href="/companies"
            style={{
              ...styles.navLink,
              ...(isActive('/companies') ? styles.navLinkActive : {}),
            }}
          >
            Companies
          </Link>
          <Link
            href="/analytics"
            style={{
              ...styles.navLink,
              ...(isActive('/analytics') ? styles.navLinkActive : {}),
            }}
          >
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: '1rem 0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#666',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  navLinkActive: {
    color: '#0066cc',
    borderBottom: '2px solid #0066cc',
    paddingBottom: '0.5rem',
  },
};

