import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, deleteNote, archiveNote, unarchiveNote } from './services/noteApi';

export default function App() {
  const [notes, setNotes] = useState();
  const [search, setSearch] = useState('');
  const [viewArchived, setViewArchived] = useState(false);

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
  }, [viewArchived]);

  async function loadNotes() {
    try {
      const data = await fetchNotes(search, viewArchived ? 'true' : 'false');
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

  async function handleArchive(note) {
    if (note.archived) {
      alert('Note is already archived.');
      return;
    }
    await archiveNote(note._id);
    loadNotes();
  }

  async function handleUnarchive(note) {
    if (!note.archived) {
      alert('Note is already unarchived.');
      return;
    }
    await unarchiveNote(note._id);
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
        <button
          onClick={() => setViewArchived((v) => !v)}
          style={{ marginLeft: '1em' }}
        >
          {viewArchived ? 'View Active Notes' : 'View Archived Notes'}
        </button>
      </div>
      {!viewArchived && <NoteForm onCreate={handleCreate} />}
      <NotesList
        notes={notes}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
        archivedView={viewArchived}
      />
    </div>
  );
}
