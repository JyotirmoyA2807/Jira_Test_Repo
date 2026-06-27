export default function NotesList({ notes, onDelete, onPinToggle }) {
  // INTENTIONAL BUG: notes may be undefined on first load and map will crash
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className="tags">{note.tags?.join(', ')}</p>
          <button onClick={() => onDelete(note)}>Delete</button>
          <button onClick={() => onPinToggle(note)}>
            {note.pinned ? 'Unpin' : 'Pin'}
          </button>
        </div>
      ))}
    </div>
  );
}
