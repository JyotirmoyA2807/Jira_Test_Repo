import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, deleteNote, pinNote, unpinNote } from './services/noteApi';

export default function App() {
  const [notes, setNotes] = useState();
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      setError(null);
      const data = await fetchNotes(search);
      setNotes(data);
    } catch (error) {
      setError('Failed to load notes');
      console.error('Failed to load notes', error);
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

  async function handlePinToggle(note) {
    setError(null);
    try {
      if (note.pinned) {
        await unpinNote(note._id);
      } else {
        await pinNote(note._id);
      }
      loadNotes();
    } catch (err) {
      setError('Failed to pin/unpin note');
    }
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
      {error && <div className="error">{error}</div>}
      <NoteForm onCreate={handleCreate} />
      <NotesList notes={notes} onDelete={handleDelete} onPinToggle={handlePinToggle} />
    </div>
  );
}
