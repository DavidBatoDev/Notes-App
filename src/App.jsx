import { useState } from 'react'
import Sidebar from './components/Sidebar';
import NotesView from './components/NotesView';
import Note from './components/Note';


function App() {
  const initialNotes = [
    {
      id: 1,
      title: 'My first note - A Diary about Fighting Demons',
      content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ',
      date: '2021-10-13T12:34:00.000Z',
    },
    {
      id: 2,
      title: 'My second note - A Diary about Fighting Demons',
      content: 'This is note 2',
      date: '2021-10-13T12:34:00.000Z',
    },
    {
      id: 3,
      title: 'Note 3',
      content: 'This is note 3',
      date: '2021-10-13T12:34:00.000Z',
    },
    {
      id: 4,
      title: 'My first note - A Diary about Fighting Demons',
      content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ',
      date: '2021-10-13T12:34:00.000Z',
    },
  ]

  const [notes, setNotes] = useState(initialNotes)
  const [currentNoteId, setCurrentNoteId] = useState(null)
  const findCurrentNote = () => {
    return notes.find(note => note.id === currentNoteId)
  }

  function addNote() {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      date: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
    setCurrentNoteId(newNote.id)
  }


  return (
    <div className="h-screen bg-violet-900 flex">
      <Sidebar addNote={addNote}/>
      {!currentNoteId ?
      <NotesView 
        notes={notes} 
        setCurrentNoteId={setCurrentNoteId}
        addNote={addNote}
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

export default App
