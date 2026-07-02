'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import {
  fetchContacts,
  fetchCompanies,
  createContact,
  updateContact,
  deleteContact,
} from '@/lib/api';

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active',
    owner: '',
    companyId: '',
  });

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  async function loadData() {
    try {
      setLoading(true);
      const [contactsData, companiesData] = await Promise.all([
        fetchContacts(statusFilter || undefined),
        fetchCompanies(),
      ]);
      setContacts(contactsData);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateContact(editingId, formData);
        setSaveMessage('Contact updated!');
      } else {
        await createContact(formData);
        setSaveMessage('Contact saved!');
      }
      setTimeout(() => setSaveMessage(null), 2000);
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: 'active',
        owner: '',
        companyId: '',
      });
      loadData();
    } catch (error) {
      console.error('Failed to save contact:', error);
      setSaveMessage('Failed to save contact');
      setTimeout(() => setSaveMessage(null), 2000);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure?')) {
      try {
        await deleteContact(id);
        setSaveMessage('Contact deleted!');
        setTimeout(() => setSaveMessage(null), 2000);
        loadData();
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }
  }

  function openEditModal(contact: any) {
    setFormData(contact);
    setEditingId(contact.id);
    setIsModalOpen(true);
  }

  function openNewModal() {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'active',
      owner: '',
      companyId: '',
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
          <h1 style={styles.title}>Contacts</h1>
          <button style={styles.button} onClick={openNewModal}>
            + New Contact
          </button>
        </div>

        <div style={styles.filters}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.select}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} style={styles.row}>
                  <td style={styles.td}>
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td style={styles.td}>{contact.email}</td>
                  <td style={styles.td}>{contact.company?.name || '-'}</td>
                  <td style={styles.td}>
                    <Badge
                      label={contact.status}
                      variant={contact.status === 'active' ? 'success' : 'warning'}
                    />
                  </td>
                  <td style={styles.td}>{contact.owner || '-'}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.actionBtn}
                      onClick={() => openEditModal(contact)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.actionBtn, color: '#d32f2f' }}
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingId ? 'Edit Contact' : 'New Contact'}
        >
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={styles.input}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              style={styles.input}
            />
            <select
              value={formData.companyId}
              onChange={(e) =>
                setFormData({ ...formData, companyId: e.target.value })
              }
              style={styles.input}
              required
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              style={styles.input}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Owner"
              value={formData.owner}
              onChange={(e) =>
                setFormData({ ...formData, owner: e.target.value })
              }
              style={styles.input}
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
  filters: {
    marginBottom: '1.5rem',
  },
  select: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
  },
  tableWrapper: {
    background: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
  actionBtn: {
    background: 'none',
    border: 'none',
    color: '#0066cc',
    cursor: 'pointer',
    marginRight: '1rem',
    fontSize: '0.9rem',
    fontWeight: 500,
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

