import { ADD_NOTE, EDIT_NOTE, GET_NOTES, REMOVE_NOTE, SELECT_NOTE } from "../../types";
import noteReducer from '../../reducers/note.reducer';



let testNote = {
  title: 'Test note',
  body: 'Test note body',
  id: 123333
};

let notes = [
    {
        title: 'Test note 43',
        body: 'Test note body',
        id: 123343
      },
      {
        title: 'Test note 53',
        body: 'Test note body',
        id: 123353
      }
]

let noteState = {
    notes:[] ,
    selectedNote: null,
    isLoading: false,
    error: null,
};

test('initial state', () => {
    expect(noteReducer(noteState, {})).toEqual(
        noteState,
      );
})

test('add note', () => {
    expect(noteReducer(noteState, {
        type: ADD_NOTE, payload: testNote
    })).toEqual(
        {
            ...noteState,
        isLoading: false,
        error: null,
        notes: [testNote]
        }
      );
})

test('edit note', () => {
    expect(noteReducer(noteState, {
        type: EDIT_NOTE, payload: testNote
    })).toEqual(
        {
            ...noteState,
        isLoading: false,
        error: null,
        notes: [testNote]
        }
      );
})

test('selected note', () => {
    expect(noteReducer(noteState, {
        type: SELECT_NOTE, payload: testNote
    })).toEqual(
        {
            ...noteState,
        isLoading: false,
        error: null,
        notes: [testNote],
        selectedNote: testNote
        }
      );
})

test('delete note', () => {
    expect(noteReducer(noteState, {
        type: REMOVE_NOTE, payload: testNote
    })).toEqual(
        {
            ...noteState,
        isLoading: false,
        error: null,
        notes: []
        }
      );
}); 

test('get notes', () => {
    expect(noteReducer(noteState, {
        type: GET_NOTES, payload: notes
    })).toEqual(
        {
            ...noteState,
        isLoading: false,
        error: null,
        notes: notes,
        }
      );
})