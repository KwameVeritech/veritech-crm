'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { fetchAnalytics, fetchCompanies, fetchContacts, fetchDeals } from '@/lib/api';

export default function Overview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [analytics, companies, contacts, deals] = await Promise.all([
          fetchAnalytics(),
          fetchCompanies(),
          fetchContacts(),
          fetchDeals(),
        ]);

        const wonDeals = deals.filter((d: any) => d.stage === 'won');
        const totalRevenue = wonDeals.reduce((sum: number, d: any) => sum + d.value, 0);

        setStats({
          totalCompanies: companies.length,
          totalContacts: contacts.length,
          totalDeals: deals.length,
          wonDeals: wonDeals.length,
          totalRevenue,
          activeContacts: contacts.filter((c: any) => c.status === 'active').length,
        });
      } catch (error) {
        console.error('Failed to load overview data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div style={styles.container}>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Overview</h1>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Total Companies</div>
            <div style={styles.cardValue}>{stats?.totalCompanies || 0}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Total Contacts</div>
            <div style={styles.cardValue}>{stats?.totalContacts || 0}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Active Contacts</div>
            <div style={styles.cardValue}>{stats?.activeContacts || 0}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Total Deals</div>
            <div style={styles.cardValue}>{stats?.totalDeals || 0}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Won Deals</div>
            <div style={styles.cardValue}>{stats?.wonDeals || 0}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Total Revenue</div>
            <div style={styles.cardValue}>
              £{(stats?.totalRevenue || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem 20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '2rem',
    color: '#1a1a1a',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  cardLabel: {
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '0.5rem',
    fontWeight: 500,
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0066cc',
  },
};

