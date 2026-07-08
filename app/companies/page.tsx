'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import {
  fetchCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from '@/lib/api';

export default function Companies() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    revenue: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to load companies:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCompany(editingId, formData);
        setSaveMessage('Company updated!');
      } else {
        await createCompany(formData);
        setSaveMessage('Company saved!');
      }
      setTimeout(() => setSaveMessage(null), 2000);
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        name: '',
        industry: '',
        size: '',
        location: '',
        revenue: 0,
      });
      loadData();
    } catch (error) {
      console.error('Failed to save company:', error);
      setSaveMessage('Failed to save company');
      setTimeout(() => setSaveMessage(null), 2000);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure?')) {
      try {
        await deleteCompany(id);
        setSaveMessage('Company deleted!');
        setTimeout(() => setSaveMessage(null), 2000);
        loadData();
      } catch (error) {
        console.error('Failed to delete company:', error);
      }
    }
  }

  function openEditModal(company: any) {
    setFormData(company);
    setEditingId(company.id);
    setIsModalOpen(true);
  }

  function openNewModal() {
    setFormData({
      name: '',
      industry: '',
      size: '',
      location: '',
      revenue: 0,
    });
    setEditingId(null);
    setIsModalOpen(true);
  }

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
        {saveMessage && (
          <div style={styles.toast}>
            {saveMessage}
          </div>
        )}
        <div style={styles.header}>
          <h1 style={styles.title}>Companies</h1>
          <button style={styles.button} onClick={openNewModal}>
            + New Company
          </button>
        </div>

        <div style={styles.grid}>
          {companies.map((company) => (
            <div key={company.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{company.name}</h3>
                <div style={styles.cardActions}>
                  <button
                    style={styles.actionBtn}
                    onClick={() => openEditModal(company)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.actionBtn, color: '#d32f2f' }}
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.row}>
                  <span style={styles.label}>Industry:</span>
                  <span>{company.industry}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Size:</span>
                  <span>{company.size}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Location:</span>
                  <span>{company.location}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Revenue:</span>
                  <span>£{company.revenue.toLocaleString()}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Contacts:</span>
                  <span>{company._count?.contacts || 0}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Deals:</span>
                  <span>{company._count?.deals || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingId ? 'Edit Company' : 'New Company'}
        >
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Company Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Industry"
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Size (e.g., 50-100)"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="number"
              placeholder="Revenue"
              value={formData.revenue}
              onChange={(e) =>
                setFormData({ ...formData, revenue: parseFloat(e.target.value) })
              }
              style={styles.input}
              required
            />
            <button type="submit" style={styles.submitBtn}>
              {editingId ? 'Update' : 'Create'}
            </button>
          </form>
        </Modal>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  button: {
    background: '#0066cc',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: 0,
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    color: '#0066cc',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
  },
  label: {
    fontWeight: 500,
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
  },
  submitBtn: {
    background: '#0066cc',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  toast: {
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    background: '#4caf50',
    color: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontSize: '0.95rem',
    fontWeight: 500,
    zIndex: 1000,
  },
};

