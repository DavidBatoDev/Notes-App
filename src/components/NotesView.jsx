import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

function NotesView({notes, setCurrentNoteId, addNote}) {
  return (
    <div className='flex w-full h-full bg-secondary p-5'>
      <div className=' w-full grid grid-cols-2 gap-4 p-10'>
        {notes.map(note => (
          <>
          <div key={note.id} onClick={() => setCurrentNoteId(note.id)} className='hover:opacity-70 cursor-pointer bg-primary rounded-3xl p-5 max-h-56 overflow-hidden'>
            <div className='flex justify-between items-start'>
              <h1 className='text-white text-md font-semibold'>{note.title}</h1>
            </div>
            <p className='text-white overflow-hidden mt-4 text-xs'>{note.content}</p>
          </div>
          </>
        ))}
        <div onClick={addNote} className='bg-red-600 rounded-3xl p-5 flex justify-center items-center'>
          <AddCircleIcon className='text-white' />
        </div>
      </div>
    </div>
  );
}

export default NotesView;
