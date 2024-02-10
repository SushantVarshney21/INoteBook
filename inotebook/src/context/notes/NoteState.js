import  { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const host = "window.location.origin";
  // const notesInitial = []
  const [notes, setNotes] = useState([]);
  const [user,setUser]= useState([])

  //Get user data
  const userData = async()=>{
    const response = await fetch(`${window.location.origin}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });
      const json = await response.json()
      setUser(json)
}

  // Get all notes
  const getNotes = async() => {
    // API call
    const response = await fetch(`${window.location.origin}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json()
    setNotes(json)
  }

  // Add a note
  const addNote = async(title, description, tag) => {
    // API call
    const response = await fetch(`${window.location.origin}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
    // API call
    const response = await fetch(`${window.location.origin}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json)

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${window.location.origin}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    console.log(json)

    //Logic to edit note in client site
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes,user, getNotes, addNote, deleteNote, editNote, userData }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
