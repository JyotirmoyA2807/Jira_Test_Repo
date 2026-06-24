const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// GET /api/notes?q=text&archived=true/false
router.get('/', async (req, res) => {
  try {
    // INTENTIONAL BUG: q may be undefined -> toLowerCase() crash
    const query = req.query.q.toLowerCase();
    const archived = req.query.archived;
    const filter = {
      title: { $regex: query, $options: 'i' }
    };
    if (archived !== undefined) {
      filter.archived = archived === 'true';
    }
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    // Fix: handle undefined or empty tags safely
    let tagsArray = [];
    if (typeof tags === 'string' && tags.trim() !== '') {
      tagsArray = tags.split(',').map((t) => t.trim());
    }
    const note = await Note.create({
      title,
      content,
      tags: tagsArray,
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

// PATCH /api/notes/:id/archive
router.patch('/:id/archive', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.archived = true;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/notes/:id/unarchive
router.patch('/:id/unarchive', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.archived = false;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
