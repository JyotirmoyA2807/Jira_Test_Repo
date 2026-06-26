import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, deleteNote } from './services/noteApi';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    setLoading(true);
    try {
      const data = await fetchNotes(search);
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes', error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    await createNote(payload);
    loadNotes();
  }

  async function handleDelete(note) {
    // INTENTIONAL BUG: frontend uses note.id instead of note._id
    await deleteNote(note.id);
    loadNotes();
  }

  return (
    <div className="page">
      <h1>MERN Notes</h1>
      <div className="toolbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes"
        />
        <button onClick={loadNotes}>Search</button>
      </div>
      <NoteForm onCreate={handleCreate} />
      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : (
        <NotesList notes={notes} onDelete={handleDelete} />
      )}
    </div>
  );
}
