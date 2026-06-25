const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Dummy permission check middleware (for demo purposes)
function checkArchivePermission(req, res, next) {
  // In a real app, check user permissions here
  // For now, allow all actions
  // Example: if (!req.user || !req.user.canArchive) return res.status(403).json({ message: 'Forbidden' });
  next();
}

// GET /api/notes?q=text&archived=true|false
router.get('/', async (req, res) => {
  try {
    const query = typeof req.query.q === 'string' ? req.query.q.toLowerCase() : '';
    const archived = req.query.archived;
    const filter = {
      title: { $regex: query, $options: 'i' }
    };
    if (archived === 'true') {
      filter.archived = true;
    } else if (archived === 'false') {
      filter.archived = false;
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
    const note = await Note.findById(req.params.noteId);
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
router.patch('/:id/archive', checkArchivePermission, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid note ID' });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    // Permissions edge case: Only allow archiving if not already archived
    if (note.archived) {
      return res.status(400).json({ message: 'Note is already archived' });
    }
    // Example permission edge case: (simulate forbidden)
    // if (req.headers['x-demo-forbidden'] === 'true') {
    //   return res.status(403).json({ message: 'Forbidden to archive note' });
    // }
    note.archived = true;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/notes/:id/unarchive
router.patch('/:id/unarchive', checkArchivePermission, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid note ID' });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    // Permissions edge case: Only allow unarchiving if archived
    if (!note.archived) {
      return res.status(400).json({ message: 'Note is not archived' });
    }
    // Example permission edge case: (simulate forbidden)
    // if (req.headers['x-demo-forbidden'] === 'true') {
    //   return res.status(403).json({ message: 'Forbidden to unarchive note' });
    // }
    note.archived = false;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
