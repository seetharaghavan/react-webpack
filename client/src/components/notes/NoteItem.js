import React from 'react'; 
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../services/actions';
import { SELECT_NOTE, SIDEBAR_TOGGLE } from '../../types';

const NoteItem = ({ noteInfo }) => {
  const { title, body } = noteInfo;
  const dispatch = useDispatch();
  return (
    <li className="note-item">
      <div className="note-holder">
        <div
          className="note-info content"
          onClick={() => {
            dispatch({ type: SELECT_NOTE, payload: noteInfo }); 
            dispatch({ type: SIDEBAR_TOGGLE, payload: false}); 
          }}
        >
          <h5 className="note-title text">{title}</h5>
          <p className="note-description text">{body}</p>
        </div>
        <div>
          <button
            className="btn btn-light"
            onClick={() => dispatch(deleteNote(noteInfo))}
          >
            x
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem; 
