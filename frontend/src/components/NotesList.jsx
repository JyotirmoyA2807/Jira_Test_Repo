export default function NotesList({ notes, onDelete }) {
  // Handle undefined, null, or empty notes array
  if (notes === undefined || notes === null) {
    return <div className="notes-grid">Loading notes...</div>;
  }
  if (Array.isArray(notes) && notes.length === 0) {
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
