export default function NotesList({ notes, onDelete }) {
  // Safely handle undefined notes and render empty or loading state
  if (!Array.isArray(notes)) {
    return <div className="notes-grid">Loading notes...</div>;
  }
  if (notes.length === 0) {
    return <div className="notes-grid">No notes found.</div>;
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
