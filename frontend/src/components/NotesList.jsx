export default function NotesList({ notes, onDelete }) {
  // Handle undefined, null, or non-array notes
  if (!Array.isArray(notes)) {
    return (
      <div className="notes-grid">
        <div className="empty-state">Loading notes...</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="notes-grid">
        <div className="empty-state">No notes found.</div>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className="tags">{note.tags?.join(', ')}</p>
          <button onClick={() => onDelete(note)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
