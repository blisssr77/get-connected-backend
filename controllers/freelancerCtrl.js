const db = require("../models");

// Get Freelancers for the current user
const getFreelancers = async (req, res) => {
    try {
        const freelancers = await db.Freelancer.find();
        if (!freelancers) {
            return res.status(404).json({ message: "Cannot find Freelancers" });
        }
        res.status(200).json({ data: freelancers });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getFreelancersByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const freelancers = await db.Freelancer.find({ User: userId });
        res.status(200).json({ data: freelancers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new Freelancer
const createFreelancer = async (req, res) => {
    try {
        const { fullname, age, career, hobby, degree, location, description, experience, photoURL } = req.body;
        const photo = req.file ? req.file.path : null;
        const userId = req.user.id
        const newFreelancer = new db.Freelancer({
            fullname,
            age,
            career,
            hobby,
            degree,
            location,
            description,
            experience,
            photo,
            photoURL,
            User: userId,
        });

        await newFreelancer.save();
        res.status(201).json({ message: "Freelancer created successfully", data: newFreelancer });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing Freelancer
const updateFreelancer = async (req, res) => {
    try {
        const updatedFreelancer = await db.Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFreelancer) {
            return res.status(400).json({ message: "Could not update Freelancer" });
        }
        res.status(200).json({ data: updatedFreelancer, message: "Freelancer updated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a Freelancer
const deleteFreelancer = async (req, res) => {
    try {
        const deletedFreelancer = await db.Freelancer.findByIdAndDelete(req.params.id);
        if (!deletedFreelancer) {
            return res.status(400).json({ message: "Could not delete Freelancer" });
        }
        res.status(200).json({ data: deletedFreelancer, message: "Freelancer deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getFreelancers,
    createFreelancer,
    updateFreelancer,
    deleteFreelancer,
    getFreelancersByUser,
};