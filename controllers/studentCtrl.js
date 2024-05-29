const { get } = require("mongoose");
const db = require("../models");

// Get Students for the current user
const getStudents = async (req, res) => {
    try {
        const students = await db.Student.find();
        if (!students) {
            return res.status(404).json({ message: "Cannot find Students" });
        }
        res.status(200).json({ data: students });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Students for the current user
const getStudentsByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const students = await db.Student.find({ User: userId });
        res.status(200).json({ data: students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new Student
const createStudent = async (req, res) => {
    try {
<<<<<<< HEAD
        const { fullname, age, career, hobby, description, location, photoURL } = req.body;
=======
        const { fullname, age, career, hobby, description, location } = req.body;
>>>>>>> origin/main
        const photo = req.file ? req.file.path : null;
        const userId = req.user.id;
        const newStudent = new db.Student({
            fullname,
            age,
            career,
            hobby,
            description,
            location,
<<<<<<< HEAD
            photo: photo,
            photoURL,
=======
            photo,
>>>>>>> origin/main
            User: userId,
        });

        await newStudent.save();
        res.status(201).json({ message: "Student created successfully", data: newStudent });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing Student
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await db.Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(400).json({ message: "Could not update Student" });
        }
        res.status(200).json({ data: updatedStudent, message: "Student updated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a Student
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await db.Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(400).json({ message: "Could not delete Student" });
        }
        res.status(200).json({ data: deletedStudent, message: "Student deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentsByUser,
};