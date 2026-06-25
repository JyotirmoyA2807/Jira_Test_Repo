import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/notes',
});

export async function fetchNotes(query = '') {
  const { data } = await api.get('/', { params: { q: query } });
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

export async function pinNote(id) {
  const { data } = await api.patch(`/${id}/pin`);
  return data;
}

export async function unpinNote(id) {
  const { data } = await api.patch(`/${id}/unpin`);
  return data;
}
