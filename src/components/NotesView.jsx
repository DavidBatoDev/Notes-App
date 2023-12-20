import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

function NotesView({notes, setCurrentNoteId, addNote, handleToggleDeleteProp, deleteNotes}) {
  const [deleteMode, setDeleteMode] = useState(false)
  return (
    <div className='flex w-full h-full bg-secondary p-5'>
      <div 
        className='w-full grid grid-cols-2 gap-4 p-10
        lg:grid-cols-4 lg:gap-5 lg:pt-5
        '
        
        >
        {notes.map(note => (
          <>
          <div key={note.id} onClick={!deleteMode ? () => setCurrentNoteId(note.id) : () => handleToggleDeleteProp(note.id)} 
            className='hover:opacity-70 cursor-pointer bg-primary rounded-3xl p-5 max-h-56 overflow-hidden'>
            {deleteMode && 
            <label>
              <input type="checkbox" checked={note.selectedForDelete}/>
            </label>
            }
            <div className='flex flex-col justify-between items-start'>
              <h1 className='text-white text-md font-semibold'>{note.title}</h1>
              <p className='text-white overflow-hidden mt-4 text-xs'>{note.content}</p>
            </div>
          </div>
          </>
        ))}
        <div onClick={addNote} 
          className='hover:opacity-70 cursor-pointer bg-red-600 rounded-3xl p-5 max-h-56 flex justify-center items-center'>
          <AddCircleIcon className='text-white' />
        </div>
      </div>
      <div className='flex justify-end'>
        {!deleteMode ?
        <DeleteIcon onClick={() => setDeleteMode(prev => !prev)} className='cursor-pointer text-white'/>
        :
        <div className='flex flex-col'>
          <CancelIcon onClick={() => setDeleteMode(prev => !prev)} className='cursor-pointer text-white'/>
          <CheckIcon onClick={() => deleteNotes()} className='text-white cursor-pointer'/>
        </div> 
        }
      </div>
    </div>
  );
}

export default NotesView;
