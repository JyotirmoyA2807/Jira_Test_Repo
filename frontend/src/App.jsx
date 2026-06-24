import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, deleteNote, archiveNote, unarchiveNote, pinNote, unpinNote } from './services/noteApi';

export default function App() {
  const [notes, setNotes] = useState();
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
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
    // INTENTIONAL BUG: frontend uses note.id instead of note._id
    await deleteNote(note.id);
    loadNotes();
  }

  async function handleArchive(note) {
    await archiveNote(note._id);
    loadNotes();
  }

  async function handleUnarchive(note) {
    await unarchiveNote(note._id);
    loadNotes();
  }

  async function handlePinToggle(note) {
    if (note.pinned) {
      await unpinNote(note._id);
    } else {
      await pinNote(note._id);
    }
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
        <button onClick={() => setShowArchived((v) => !v)}>
          {showArchived ? 'Show Active Notes' : 'Show Archived Notes'}
        </button>
      </div>
      {!showArchived && <NoteForm onCreate={handleCreate} />}
      <NotesList
        notes={notes}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
        showArchived={showArchived}
        onPinToggle={handlePinToggle}
      />
    </div>
  );
}
