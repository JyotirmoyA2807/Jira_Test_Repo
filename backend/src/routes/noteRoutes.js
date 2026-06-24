const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// GET /api/notes?q=text&archived=true|false
router.get('/', async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const archived = req.query.archived === 'true';

    const notes = await Note.find({
      archived: archived,
      title: { $regex: query, $options: 'i' }
    }).sort({ pinned: -1, createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const note = await Note.create({
      title,
      content,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notes/:noteId
router.put('/:noteId', async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
    if (req.body.archived !== undefined) {
      note.archived = req.body.archived;
    }
    if (req.body.pinned !== undefined) {
      note.pinned = req.body.pinned;
    }
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
