import React, {useEffect, useState} from 'react'
import NotesView from './NotesView';
import Note from './Note';

function Notes() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])
    const [currentNoteId, setCurrentNoteId] = useState(null)
    const findCurrentNote = () => {
        return notes.find(note => note.id === currentNoteId)
    }

    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    function addNote() {
        const newNote = {
        id: Date.now(),
        title: "Untitled",
        content: "",
        date: new Date().toISOString(),
        }
        setNotes([newNote, ...notes])
        setCurrentNoteId(newNote.id)
    }

    function handleToggleDeleteProp(id) {
        setNotes(prevNotes => prevNotes.map(note => note.id === id 
        ? {...note, selectedForDelete: !note.selectedForDelete } : note))
    }

    function deleteNotes() {
        setNotes(prevNotes => prevNotes.filter(note => !note.selectedForDelete))
    }


    return (
        <div className="h-screen w-full bg-violet-900 flex">
          {!currentNoteId ?
          <NotesView 
            notes={notes} 
            setCurrentNoteId={setCurrentNoteId}
            addNote={addNote}
            handleToggleDeleteProp={handleToggleDeleteProp}
            deleteNotes={deleteNotes}
            />
          :
          <Note 
            note={findCurrentNote()} 
            setNotes={setNotes}
            setCurrentNoteId={setCurrentNoteId}
          />
          }
        </div>
      );
}

export default Notes
