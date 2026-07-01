const API_BASE = '/api';

export async function fetchContacts(status?: string) {
  const url = new URL(`${API_BASE}/contacts`, window.location.origin);
  if (status) url.searchParams.set('status', status);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return res.json();
}

export async function fetchContact(id: string) {
  const res = await fetch(`${API_BASE}/contacts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch contact');
  return res.json();
}

export async function createContact(data: any) {
  const res = await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return res.json();
}

export async function updateContact(id: string, data: any) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update contact');
  return res.json();
}

export async function deleteContact(id: string) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
}

export async function fetchCompanies() {
  const res = await fetch(`${API_BASE}/companies`);
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}

export async function fetchCompany(id: string) {
  const res = await fetch(`${API_BASE}/companies/${id}`);
  if (!res.ok) throw new Error('Failed to fetch company');
  return res.json();
}

export async function createCompany(data: any) {
  const res = await fetch(`${API_BASE}/companies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create company');
  return res.json();
}

export async function updateCompany(id: string, data: any) {
  const res = await fetch(`${API_BASE}/companies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update company');
  return res.json();
}

export async function deleteCompany(id: string) {
  const res = await fetch(`${API_BASE}/companies/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete company');
  return res.json();
}

export async function fetchDeals(stage?: string) {
  const url = new URL(`${API_BASE}/deals`, window.location.origin);
  if (stage) url.searchParams.set('stage', stage);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch deals');
  return res.json();
}

export async function createDeal(data: any) {
  const res = await fetch(`${API_BASE}/deals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create deal');
  return res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

