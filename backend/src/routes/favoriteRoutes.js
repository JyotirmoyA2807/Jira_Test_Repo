const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// PATCH /api/notes/:id/favorite
router.patch('/:id/favorite', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.favorite = true;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/notes/:id/unfavorite
router.patch('/:id/unfavorite', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.favorite = false;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
