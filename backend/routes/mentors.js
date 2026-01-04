const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

// GET all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find({ isActive: true });
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mentors',
      error: error.message
    });
  }
});

// GET mentor by ID
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    res.json({
      success: true,
      data: mentor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mentor',
      error: error.message
    });
  }
});

// POST create new mentor
router.post('/', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json({
      success: true,
      message: 'Mentor created successfully',
      data: mentor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating mentor',
      error: error.message
    });
  }
});

// PUT update mentor
router.put('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    res.json({
      success: true,
      message: 'Mentor updated successfully',
      data: mentor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating mentor',
      error: error.message
    });
  }
});

// DELETE mentor (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    res.json({
      success: true,
      message: 'Mentor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting mentor',
      error: error.message
    });
  }
});

// GET mentors by filters
router.get('/filter/:field/:value', async (req, res) => {
  try {
    const { field, value } = req.params;
    const query = { isActive: true };
    query[field] = value;
    
    const mentors = await Mentor.find(query);
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtering mentors',
      error: error.message
    });
  }
});

module.exports = router;