const express = require('express');
const router = require('express').Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note');

// Route:1 Fetch all the notes using: GET /api/notes/fetchallnotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // find all the notes with the user id
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});



// Route:2 Add a new note using: POST /api/notes/addnote login required
router.post('/addnote', fetchuser, [
    //validation for title and content
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('content', 'Enter a valid content').isLength({ min: 5 }),
], async (req, res) => {
    // destructure the title, content and tag from the request
    const { title, content, tag } = req.body;

    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // create a new note
        const note = new Note({
            user: req.user.id,
            title,
            content,
            tag
        });
        // save the note to the database
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});



// Route:3 Update an existing note using: PUT /api/notes/updatenote login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, content, tag } = req.body;
    // create a newNote object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (content) { newNote.content = content; }
    if (tag) { newNote.tag = tag; }

    try {

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        // check if the user is the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // find the note by id and update it
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});



// Route:4 Delete an existing note using: DELETE /api/notes/deletenote login required
router.delete('/deletenote/:id',
fetchuser,
 async (req, res) => {
    try {
        // find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        // check if the user is the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


module.exports = router;