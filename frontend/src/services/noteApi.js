import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/notes',
});

export async function fetchNotes(query = '', archived = false) {
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
  try {
    const { data } = await api.patch(`/${id}/archive`);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function unarchiveNote(id) {
  try {
    const { data } = await api.patch(`/${id}/unarchive`);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// TEST CASES for fetchNotes
if (typeof window === 'undefined') {
  (async () => {
    // Test: fetch unarchived notes
    try {
      const notes = await fetchNotes('', false);
      console.log('Test fetchNotes (unarchived):', Array.isArray(notes));
    } catch (e) {
      console.error('Test fetchNotes (unarchived) failed:', e);
    }
    // Test: fetch archived notes
    try {
      const notes = await fetchNotes('', true);
      console.log('Test fetchNotes (archived):', Array.isArray(notes));
    } catch (e) {
      console.error('Test fetchNotes (archived) failed:', e);
    }
    // Test: fetch with search query
    try {
      const notes = await fetchNotes('test', false);
      console.log('Test fetchNotes (search):', Array.isArray(notes));
    } catch (e) {
      console.error('Test fetchNotes (search) failed:', e);
    }
  })();
}
