import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, deleteNote, updateNote, togglePinNote } from './services/noteApi';

export default function App() {
  const [notes, setNotes] = useState();
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadNotes();
  }, [showArchived]);

  async function loadNotes() {
    try {
      const data = await fetchNotes(search, showArchived);
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes', error);
    }
  }

  async function handleCreate(payload) {
    await createNote(payload);
    loadNotes();
  }

  async function handleDelete(note) {
    await deleteNote(note._id);
    loadNotes();
  }

  async function handleArchiveToggle(note) {
    await updateNote(note._id, { archived: !note.archived });
    loadNotes();
  }

  async function handlePinToggle(note) {
    await togglePinNote(note._id, !note.pinned);
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
        <button onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? 'Show Active Notes' : 'Show Archived Notes'}
        </button>
      </div>
      <NoteForm onCreate={handleCreate} />
      <NotesList
        notes={notes}
        onDelete={handleDelete}
        onArchiveToggle={handleArchiveToggle}
        onPinToggle={handlePinToggle}
      />
    </div>
  );
}
