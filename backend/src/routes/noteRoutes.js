const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// GET /api/notes?q=text
router.get('/', async (req, res) => {
  try {
    // INTENTIONAL BUG: q may be undefined -> toLowerCase() crash
    const query = req.query.q.toLowerCase();

    const notes = await Note.find({
      title: { $regex: query, $options: 'i' }
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    // INTENTIONAL BUG: tags may be undefined -> split crash
    const note = await Note.create({
      title,
      content,
      tags: tags.split(',').map((t) => t.trim()),
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notes/:noteId
router.put('/:noteId', async (req, res) => {
  try {
    // INTENTIONAL BUG: wrong route param name used below
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;
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

// POST /api/notes/:id/pin
router.post('/:id/pin', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (note.pinned) {
      // Already pinned, idempotent
      return res.json(note);
    }
    note.pinned = true;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notes/:id/unpin
router.post('/:id/unpin', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (!note.pinned) {
      // Already unpinned, idempotent
      return res.json(note);
    }
    note.pinned = false;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
