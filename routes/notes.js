const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const {body, validationResult} = require('express-validator');

// Route 1 : Get all the user notes using : get "http://localhost:5000/api/notes/fetchallnotes"  login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes =  await Note.find({user : req.user.id})
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})

// Route 2 : Add a new note using : post "http://localhost:5000/api/notes/addnote"  login required
router.post('/addnote',fetchuser,[
    body('title', 'Enter a vailid Title').isLength({min:3}),
    body('description', 'Enter at least 5 character in description').isLength({min:5})
], async (req,res)=>{
   try {
    const {title, description, tag} = req.body;
    // if there are errors create a bad request and the error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // Create a new note
    const note = new Note ({
       title,description,tag,user: req.user.id
    })
    const saveNote = await note.save()
    res.json(saveNote)
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
} 
})

// Route 3 : Update an existing note using : put "http://localhost:5000/api/notes/updatenote"  login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        const newNote ={};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //Find the note to be update and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote}, {new:true});
    res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})

//   Route 3 : Delete an existing note using : delete "http://localhost:5000/api/notes/deletenote"  login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{

    try {
        //Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        // Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

        note = await Note.findByIdAndDelete(req.params.id );
        res.json({"Success" : "Note has been deleted" , note : note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})

module.exports = router