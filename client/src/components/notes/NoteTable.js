import React from 'react'; 
import { useSelector } from 'react-redux';
import NoteItem from "./NoteItem";


const NoteTable = ({notes}) => {
    const sidebarState = useSelector(state => state.sidebarState); 
    return (
        <div className={`note-table collapse ${sidebarState.sidebarOpen ? 'show' : ''}`}>
            {
                notes.length > 0 ? 
                <ul>
                {
                    notes.map((prop, key) => {
                        return (
                            <NoteItem noteInfo={prop} key={key}/>
                        )
                    })
                }
            </ul>
            : 
            <div className="empty-note">
                <p>No Notes to display</p>
            </div>
            }
        </div>
    )
}

export default NoteTable; 