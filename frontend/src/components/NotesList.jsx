export default function NotesList({ notes, onDelete, onPinToggle }) {
  // INTENTIONAL BUG: notes may be undefined on first load and map will crash
  if (!notes) return null;

  // Sort notes: pinned first (by createdAt desc), then unpinned (by createdAt desc)
  const pinnedNotes = notes.filter((n) => n.pinned).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const unpinnedNotes = notes.filter((n) => !n.pinned).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="notes-grid">
      {pinnedNotes.length > 0 && (
        <div className="pinned-section">
          <h2>Pinned</h2>
          {pinnedNotes.map((note) => (
            <div className="note-card pinned" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p className="tags">{note.tags?.join(', ')}</p>
              <button onClick={() => onDelete(note)}>Delete</button>
              <button onClick={() => onPinToggle(note)}>{note.pinned ? 'Unpin' : 'Pin'}</button>
            </div>
          ))}
        </div>
      )}
      <div className="unpinned-section">
        {unpinnedNotes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p className="tags">{note.tags?.join(', ')}</p>
            <button onClick={() => onDelete(note)}>Delete</button>
            <button onClick={() => onPinToggle(note)}>{note.pinned ? 'Unpin' : 'Pin'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
