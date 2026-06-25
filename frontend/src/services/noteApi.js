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
  try {
    const { data } = await api.post(`/${id}/pin`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unpinNote(id) {
  try {
    const { data } = await api.post(`/${id}/unpin`);
    return data;
  } catch (error) {
    throw error;
  }
}
