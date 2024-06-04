const Comment = require('../models/Comment');
const db = require('../models');

// Controller to fetch comments for a specific student or freelancer
const getComments = async (req, res) => {
    const { id } = req.params;
    const query = req.url.includes('students') ? { studentId: id } : { freelancerId: id };
    const userId = req.user.id;

    try {
        const comments = await Comment.find( query ).populate('User');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to create a new comment
const createComment = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    const { id } = req.params;
    const commentData = { content, User: userId };

    if (req.url.includes('students')) {
        commentData.studentId = id;
    } else if (req.url.includes('freelancers')) {
        commentData.freelancerId = id;
    }

    try {
        const newComment = new Comment(commentData);
        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id).populate('User');
        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update a comment
const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        ).populate('User');

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a comment
const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
};