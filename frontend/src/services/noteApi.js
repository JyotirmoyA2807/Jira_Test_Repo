import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/notes',
});

export async function fetchNotes(query = '', archived = undefined) {
  const params = { q: query };
  if (archived !== undefined) {
    params.archived = archived;
  }
  const { data } = await api.get('/', { params });
  return data;
}

export async function createNote(payload) {
  const { data } = await api.post('/', payload);
  return data;
}

export async function deleteNote(id) {
  const { data } = await api.delete(`/${id}`);
  return data;
}

export async function archiveNote(id) {
  const { data } = await api.patch(`/${id}/archive`);
  return data;
}

export async function unarchiveNote(id) {
  const { data } = await api.patch(`/${id}/unarchive`);
  return data;
}

export async function pinNote(id) {
  const { data } = await api.patch(`/${id}/pin`);
  return data;
}

export async function unpinNote(id) {
  const { data } = await api.patch(`/${id}/unpin`);
  return data;
}
