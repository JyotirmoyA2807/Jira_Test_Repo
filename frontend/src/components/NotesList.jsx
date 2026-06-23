export default function NotesList({ notes, onDelete, onArchiveToggle, onPinToggle }) {
  if (!notes) return <div>No notes to display.</div>;

  return (
    <div className="notes-grid">
      {notes.length === 0 && <p>No notes found.</p>}
      {notes.map((note) => (
        <div className="note-card" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className="tags">{note.tags?.join(', ')}</p>
          <button onClick={() => onDelete(note)}>Delete</button>
          <button onClick={() => onArchiveToggle(note)}>
            {note.archived ? 'Unarchive' : 'Archive'}
          </button>
          <button onClick={() => onPinToggle(note)}>
            {note.pinned ? 'Unpin' : 'Pin'}
          </button>
        </div>
      ))}
    </div>
  );
}
