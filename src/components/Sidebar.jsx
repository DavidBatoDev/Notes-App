import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom';

function Sidebar({addNote}) {
  return (
    <div className='flex flex-col w-58 bg-primary h-screen'>
        <div className='flex justify-between items-center text-white h-14 font-semibold px-2'>
            <div className='flex'>
                <AccountCircleIcon className='mr-2'/>
                <h1>David</h1>
            </div>
            <div>
                <SettingsIcon className='mr-2'/>
            </div>
        </div>
        <div className='flex px-3 flex-col gap-y-3'>
            <input 
                type="text" 
                placeholder='Search notes' 
                className='text-white  px-2 h-9 rounded-3xl border-l-slate-400 bg-secondary'/>
            <button 
                onClick={() => addNote()}
                className='bg-red-600 text-white h-8 rounded-3xl border-l-slate-400'
            >New Note</button>
        </div>
        <div className='mt-3 flex flex-col pl-4'>
            <Link to="/notes">
                <div className='hover:opacity-70 text-white h-10 font-normal  flex items-center cursor-pointer'>
                    <EditNoteIcon className='mr-2'/>
                    Notes
                </div>
            </Link>
            <Link to='/todolist'>
                <div className='hover:opacity-70 text-white h-10 font-normal flex items-center cursor-pointer'>
                    <EditNoteIcon className='mr-2'/>
                    Todo List
                </div>
            </Link>
            <Link>
                <div className='hover:opacity-70 text-white h-10 font-normal flex items-center cursor-pointer'>
                    <EditNoteIcon className='mr-2'/>
                    Sketch
                </div>
            </Link>
            <Link>
                <div className='hover:opacity-70 text-white h-10 font-normal flex items-center cursor-pointer'>
                    <EditNoteIcon className='mr-2'/>
                    Record
                </div>
            </Link>
            <div className='mt-10 text-white h-9 font-semibold flex items-center cursor-pointer'>
                <DeleteIcon />
                Trash
            </div>
        </div>
    </div>
  )
}

export default Sidebar
