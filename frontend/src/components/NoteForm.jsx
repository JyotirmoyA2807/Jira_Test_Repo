import { useState } from 'react';

export default function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await onCreate({ title, content, tags });
    setTitle('');
    setContent('');
    setTags('');
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1,tag2" />
      <button type="submit">Save Note</button>
    </form>
  );
}
