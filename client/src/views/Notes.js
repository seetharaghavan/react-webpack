import React from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import NoteForm from "../components/notes/NoteForm";
import NoteTable from "../components/notes/NoteTable";
import { getAllNotes, logOut } from '../services/actions';
import { NOTE_FORM_RESET, SIDEBAR_TOGGLE } from '../types';

const NotesView = ({ history }) => {
  const authState = useSelector((state) => state.authState);
  const noteState = useSelector((state) => state.noteState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(getAllNotes());
    } else {
      history.push("/");
    }
  }, [authState, dispatch]);

  return (
    <div className="container">
      <Header dispatch={dispatch} />
      <div className="note-form">
        <NoteTable notes={noteState.notes} />
        <NoteForm noteState={noteState} />
      </div>
    </div>
  );

};


const Header = ({ dispatch }) => {
  const sidebarState = useSelector((state) => state.sidebarState);
  return (
    <div className="header">
      <p className = "header-name-text">G Notes</p>
      <div>
        {
          sidebarState.sidebarOpen ? 
          <button
          className="btn btn-primary mobile-button header-button" 
          onClick={() => {
            dispatch({ type: SIDEBAR_TOGGLE, payload: false })
            dispatch({type: NOTE_FORM_RESET}); 
          }}
        >
          Add New
        </button>
        :
        <button
          className="btn btn-primary mobile-button header-button"
          onClick={() => {
            dispatch({ type: SIDEBAR_TOGGLE, payload: true })
            dispatch({type: NOTE_FORM_RESET}); 
          }}
        >
          Notes
        </button>
        }
        <button className="btn btn-light" onClick={() => dispatch(logOut())}>
          Log Out
        </button>
      </div>
    </div>
  );
};


export default NotesView; 