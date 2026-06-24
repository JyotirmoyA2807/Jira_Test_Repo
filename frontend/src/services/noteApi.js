import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/notes',
});

export async function fetchNotes(query = '', archived = false) {
  const { data } = await api.get('/', { params: { q: query, archived } });
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

export async function updateNote(id, payload) {
  const { data } = await api.put(`/${id}`, payload);
  return data;
}

export async function togglePinNote(id, pinned) {
  const { data } = await api.put(`/${id}`, { pinned });
  return data;
}
