const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Algorithms', 'Mathematics', 'Logic', 'Data Structures', 'System Design']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  timeEstimate: {
    type: String,
    required: true
  },
  testCases: [{
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    }
  }],
  solution: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  solvedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem; 