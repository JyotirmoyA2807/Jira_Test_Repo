export default function NotesList({ notes, onDelete, onArchive, onUnarchive, showArchived }) {
  // Handle undefined notes gracefully
  const safeNotes = Array.isArray(notes) ? notes : [];
  // Default action handlers to no-op
  const handleDelete = typeof onDelete === 'function' ? onDelete : () => {};
  const handleArchive = typeof onArchive === 'function' ? onArchive : () => {};
  const handleUnarchive = typeof onUnarchive === 'function' ? onUnarchive : () => {};

  return (
    <div className="notes-grid">
      {safeNotes.map((note) => (
        <div className="note-card" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className="tags">{note.tags?.join(', ')}</p>
          <div className="note-actions">
            <button onClick={() => handleDelete(note)}>Delete</button>
            {showArchived ? (
              <button onClick={() => handleUnarchive(note)} disabled={!note.archived}>Unarchive</button>
            ) : (
              <button onClick={() => handleArchive(note)} disabled={note.archived}>Archive</button>
            )}
            <span className="archived-status">{note.archived ? 'Archived' : 'Active'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
