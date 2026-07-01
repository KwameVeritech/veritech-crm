'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { fetchAnalytics } from '@/lib/api';

export default function Analytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const analytics = await fetchAnalytics();
        setData(analytics);
      } catch (error) {
        console.error('Failed to load analytics:', error);
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

  const monthlyData = Object.entries(data?.monthlyRevenue || {}).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );

  const stageData = Object.entries(data?.dealsByStage || {}).map(
    ([stage, count]) => ({
      stage,
      count,
    })
  );

  const industryData = Object.entries(data?.revenueByIndustry || {}).map(
    ([industry, revenue]) => ({
      industry,
      revenue,
    })
  );

  const statusData = Object.entries(data?.contactsByStatus || {}).map(
    ([status, count]) => ({
      status,
      count,
    })
  );

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Analytics</h1>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Monthly Won Revenue</h3>
            <div style={styles.chartContainer}>
              {monthlyData.length > 0 ? (
                <div style={styles.barChart}>
                  {monthlyData.map((item: any) => (
                    <div key={item.month} style={styles.barItem}>
                      <div
                        style={{
                          ...styles.bar,
                          height: `${Math.max(
                            (item.revenue / Math.max(...monthlyData.map((d: any) => d.revenue))) * 200,
                            20
                          )}px`,
                        }}
                      />
                      <div style={styles.barLabel}>{item.month}</div>
                      <div style={styles.barValue}>
                        £{(item.revenue / 1000).toFixed(0)}k
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No data</p>
              )}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Deals by Stage</h3>
            <div style={styles.chartContainer}>
              {stageData.length > 0 ? (
                <div style={styles.list}>
                  {stageData.map((item: any) => (
                    <div key={item.stage} style={styles.listItem}>
                      <span style={styles.listLabel}>{item.stage}</span>
                      <div style={styles.progressBar}>
                        <div
                          style={{
                            ...styles.progressFill,
                            width: `${(item.count / Math.max(...stageData.map((d: any) => d.count))) * 100}%`,
                          }}
                        />
                      </div>
                      <span style={styles.listValue}>{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No data</p>
              )}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Revenue by Industry</h3>
            <div style={styles.chartContainer}>
              {industryData.length > 0 ? (
                <div style={styles.list}>
                  {industryData.map((item: any) => (
                    <div key={item.industry} style={styles.listItem}>
                      <span style={styles.listLabel}>{item.industry}</span>
                      <span style={styles.listValue}>
                        £{(item.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No data</p>
              )}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Contacts by Status</h3>
            <div style={styles.chartContainer}>
              {statusData.length > 0 ? (
                <div style={styles.list}>
                  {statusData.map((item: any) => (
                    <div key={item.status} style={styles.listItem}>
                      <span style={styles.listLabel}>{item.status}</span>
                      <span style={styles.listValue}>{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No data</p>
              )}
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Top Open Deals</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.th}>Deal</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Value</th>
                  <th style={styles.th}>Stage</th>
                  <th style={styles.th}>Close Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.topOpenDeals?.map((deal: any) => (
                  <tr key={deal.id} style={styles.row}>
                    <td style={styles.td}>{deal.title}</td>
                    <td style={styles.td}>{deal.company?.name}</td>
                    <td style={styles.td}>£{deal.value.toLocaleString()}</td>
                    <td style={styles.td}>{deal.stage}</td>
                    <td style={styles.td}>
                      {new Date(deal.closeDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    background: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  chartContainer: {
    minHeight: '200px',
  },
  barChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '250px',
    gap: '0.5rem',
  },
  barItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: '100%',
    background: '#0066cc',
    borderRadius: '0.25rem',
    minHeight: '20px',
  },
  barLabel: {
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    color: '#666',
  },
  barValue: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#0066cc',
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  listLabel: {
    fontSize: '0.9rem',
    fontWeight: 500,
    minWidth: '100px',
  },
  progressBar: {
    flex: 1,
    height: '8px',
    background: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#0066cc',
  },
  listValue: {
    fontSize: '0.9rem',
    fontWeight: 600,
    minWidth: '60px',
    textAlign: 'right' as const,
  },
  tableWrapper: {
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  headerRow: {
    background: '#f5f5f5',
    borderBottom: '2px solid #ddd',
  },
  th: {
    padding: '1rem',
    textAlign: 'left' as const,
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#666',
  },
  row: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '1rem',
    fontSize: '0.95rem',
  },
};

