const Assignment = require('../models/assignment');

// Get assignments for admin
exports.getAssignments = async (req, res) => {
    const assignments = await Assignment.find({ admin: req.user.id });
    res.json(assignments);
};

// Accept an assignment
exports.acceptAssignment = async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    assignment.status = 'Accepted';
    await assignment.save();
    res.json({ message: 'Assignment accepted' });
};

// Reject an assignment
exports.rejectAssignment = async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    assignment.status = 'Rejected';
    await assignment.save();
    res.json({ message: 'Assignment rejected' });
};
