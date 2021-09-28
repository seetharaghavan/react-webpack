import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addNewNote, updateNote } from '../../services/actions';
import { NOTE_FORM_RESET, SIDEBAR_TOGGLE } from '../../types';

const NoteForm = ({noteState}) => {
  const [noteObj, setNoteObj] = React.useState({ title: "", body: "" });

  const [errors, setErrors] = React.useState({ field: null, message: "" });

  const dispatch = useDispatch(); 

  const sidebarState = useSelector(state => state.sidebarState); 


  React.useEffect(() => {
    if(noteState && noteState.selectedNote){
        const {title, body} = noteState.selectedNote; 
        setNoteObj(prev => ({title, body})) 
    } else {
      setNoteObj(prev => ({title: '', body: ''}))
    }
  }, [noteState])

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(ValidateForm(noteObj)){
        let notes = {
            ...noteObj
        }
        if(noteState && noteState.selectedNote) {
            notes.id = noteState.selectedNote.id; 
            dispatch(updateNote(notes)); 
        } else{
            notes.id = Math.floor(Math.random() * 100000); 
            dispatch(addNewNote(notes)); 
        }

        dispatch({type: SIDEBAR_TOGGLE, payload: true}); 
        dispatch({type: NOTE_FORM_RESET}); 
        
        setNoteObj(prev => ({
            ...prev,
            title: '',
            body: ''
        }));
    } else {
        return; 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ValidateForm = (noteObj) => {
    let isValid = false;
    if (noteObj.title.length === 0) {
      setErrors((prev) => ({
        ...prev,
        field: "title",
        message: "Add title",
      }));
      return isValid;
    } else if (noteObj.body.length === 0) {
      setErrors((prev) => ({
        ...prev,
        field: "body",
        message: "Add a brief description",
      }));
      return isValid;
    } else {
      isValid = true;
      setErrors((prev) => ({
        ...prev,
        field: null,
        message: "",
      }));
    }
    return isValid;
  };

  return (
    <div className={`note-area collapse ${!sidebarState.sidebarOpen ? 'show' : ''}`}>
      <form onSubmit={onFormSubmit}>
        <div className="form-group text-right">
          <button className="btn btn-light" onClick={(e) => {
            e.preventDefault(); 
            dispatch({type: NOTE_FORM_RESET}); 
            setNoteObj({title: '', body: ''}); 
          }}>
            Add New
          </button>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={noteObj.title}
            name="title"
            onChange={handleInputChange}
            data-testid="note-title"
            required
          />
          {
              errors.field === 'title' && <small className="text-danger">{errors.message}</small>
          }
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            className="form-control"
            rows={15}
            name="body"
            value={noteObj.body}
            placeholder="Enter description"
            onChange={handleInputChange}
            data-testid="note-body"
            required
          />
           {
              errors.field === 'body' && <small className="text-danger">{errors.message}</small>
          }
        </div>
        <div className="form-group text-right">
          <button type="submit" data-testid="note-submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm; 
