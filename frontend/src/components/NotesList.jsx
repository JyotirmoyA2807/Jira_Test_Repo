import React from 'react';

export default function NotesList({ notes, onDelete, onFavoriteToggle }) {
  // INTENTIONAL BUG: notes may be undefined on first load and map will crash
  return (
    <div className="notes-grid">
      {notes && notes.length === 0 && (
        <div className="no-notes">No notes found.</div>
      )}
      {notes && notes.map((note) => (
        <div className={`note-card${note.favorite ? ' favorite' : ''}`} key={note._id}>
          <div className="note-header">
            <h3>{note.title}</h3>
            <button
              className="favorite-toggle"
              aria-label={note.favorite ? 'Unmark as favorite' : 'Mark as favorite'}
              title={note.favorite ? 'Unmark as favorite' : 'Mark as favorite'}
              onClick={() => onFavoriteToggle(note)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}
            >
              {note.favorite ? '★' : '☆'}
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
