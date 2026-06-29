export default function NotesList({ notes, onDelete, onPinToggle }) {
  // INTENTIONAL BUG: notes may be undefined on first load and map will crash
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card" key={note._id}>
          <div className="note-header">
            <h3>{note.title}</h3>
            <button
              aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
              className={note.pinned ? 'pin-btn pinned' : 'pin-btn'}
              onClick={() => onPinToggle(note)}
              title={note.pinned ? 'Unpin' : 'Pin'}
            >
              {note.pinned ? '📌' : '📍'}
            </button>
          </div>
          <p>{note.content}</p>
          <p className="tags">{note.tags?.join(', ')}</p>
          <button onClick={() => onDelete(note)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
