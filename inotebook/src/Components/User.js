import React, { useContext,useState, useEffect,useRef } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const User = (props) => {
  const refClose = useRef(null);
  const ref = useRef(null);
  const [note , setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
  const { showAlert  } = props;
  let history = useNavigate();
  const context = useContext(noteContext);
  const { user,notes,  getNotes,editNote  } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  };


  const handleClick = () => {
    // console.log("updating a note", note);
    // console.log(note.id)
    editNote(note.id, note.etitle, note.edescription , note.etag)
    refClose.current.click();
    props.showAlert("Update Successfully" , "success")
  };
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  };

  const capitalize = (word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div>
      <div className="container mt-5">
        <h1 className="m-4">Hello, {capitalize(user.name)}</h1>
        <div className=" card mt-4 p-4" style={{ width: "60%", left: "0" }}>
          <h4>Name - {capitalize(user.name)}</h4>
          <h4>Email-Id - {user.email}</h4>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row my-3">
          <div className="container">
            <h2>Your Notes</h2>
            {notes.length === 0 && "You are not add any note"}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    minLength={5}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle }
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    value={note.edescription }
                    type="text"
                    minLength={5}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Notes updateNote={updateNote} showAlert={showAlert}/> */}
    </div>
  );
};

export default User;
