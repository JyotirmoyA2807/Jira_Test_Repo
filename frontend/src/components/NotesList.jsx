import './NotesList.css';

export default function NotesList({ notes, onDelete, onFavoriteToggle }) {
  // Handle notes being undefined or null
  const safeNotes = Array.isArray(notes) ? notes : [];
  return (
    <div className="notes-grid">
      {safeNotes.map((note) => (
        <div className={`note-card${note.favorite ? ' favorite' : ''}`} key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className="tags">{note.tags?.join(', ')}</p>
          <button onClick={() => onDelete(note)}>Delete</button>
          <button
            className="favorite-toggle"
            onClick={() => onFavoriteToggle(note)}
            aria-label={note.favorite ? 'Unfavorite' : 'Favorite'}
          >
            {note.favorite ? '★' : '☆'}
          </button>
        </div>
      ))}
    </div>
  );
}

/* Favorite styling for notes */
// Add this to NotesList.css:
// .note-card.favorite {
//   border-color: gold;
//   background: #fffbe6;
// }
// .favorite-toggle {
//   background: none;
//   border: none;
//   font-size: 1.5em;
//   cursor: pointer;
//   color: gold;
// }
