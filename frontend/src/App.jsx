import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, deleteNote, archiveNote, unarchiveNote } from './services/noteApi';

export default function App() {
  const [notes, setNotes] = useState();
  const [search, setSearch] = useState('');
  const [viewArchived, setViewArchived] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
  }, [viewArchived]);

  async function loadNotes() {
    try {
      setError(null);
      const data = await fetchNotes(search, viewArchived);
      setNotes(data);
    } catch (error) {
      setNotes([]);
      setError('Failed to load notes');
      console.error('Failed to load notes', error);
    }
  }

  async function handleCreate(payload) {
    try {
      await createNote(payload);
      loadNotes();
    } catch (error) {
      setError('Failed to create note');
      console.error('Failed to create note', error);
    }
  }

  async function handleDelete(note) {
    try {
      await deleteNote(note._id);
      loadNotes();
    } catch (error) {
      setError('Failed to delete note');
      console.error('Failed to delete note', error);
    }
  }

  async function handleArchive(note) {
    try {
      await archiveNote(note._id);
      loadNotes();
    } catch (error) {
      // Consistent error handling
      if (error.response && error.response.status === 403) {
        setError('You do not have permission to archive this note.');
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to archive note');
      }
      console.error('Failed to archive note', error);
    }
  }

  async function handleUnarchive(note) {
    try {
      await unarchiveNote(note._id);
      loadNotes();
    } catch (error) {
      // Consistent error handling
      if (error.response && error.response.status === 403) {
        setError('You do not have permission to unarchive this note.');
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to unarchive note');
      }
      console.error('Failed to unarchive note', error);
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
        <button
          onClick={() => setViewArchived((v) => !v)}
          style={{ marginLeft: 8 }}
        >
          {viewArchived ? 'Show Active Notes' : 'Show Archived Notes'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {!viewArchived && <NoteForm onCreate={handleCreate} />}
      <NotesList
        notes={notes}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
        showArchived={viewArchived}
      />
    </div>
  );
}
