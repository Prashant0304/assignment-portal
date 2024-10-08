const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    // Validation logic here
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
};

// User login
exports.loginUser = async (req, res) => {
    // Validation logic here
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
};

// Upload assignment
exports.uploadAssignment = async (req, res) => {
    // Validation logic here
    const { task, adminId } = req.body;
    const assignment = new Assignment({ userId: req.user.id, task, admin: adminId });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
};
