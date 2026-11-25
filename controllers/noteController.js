const Note = require("../models/Note");

exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            owner: req.user.id
        });
        res.status(201).json({ success: true, note });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = req.user.role === "admin"
            ? await Note.find()
            : await Note.find({ owner: req.user.id });
        res.status(200).json({ success: true, count: notes.length, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const filter = req.user.role === "admin"
            ? { _id: req.params.id }
            : { _id: req.params.id, owner: req.user.id };

        const note = await Note.findOneAndUpdate(
            filter,
            { title: req.body.title, content: req.body.content },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
        res.status(200).json({ success: true, note });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const filter = req.user.role === "admin"
            ? { _id: req.params.id }
            : { _id: req.params.id, owner: req.user.id };

        const note = await Note.findOneAndDelete(filter);
        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
        res.status(200).json({ success: true, message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
