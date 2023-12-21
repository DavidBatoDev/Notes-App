import React, {useState} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { nanoid } from 'nanoid'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'

function SketchesView({sketches, setCurrentSketchId, deleteSketch}) {
    const [deleteMode, setDeleteMode] = useState(false)
    const handleAddSketch = () => {
        const id = nanoid()
        setCurrentSketchId(id)
    }
  
  
    return (
    <div className='flex w-full h-full bg-secondary p-5'>
        <div 
            className='w-full grid grid-cols-2 gap-4 p-10
            lg:grid-cols-4 lg:gap-5 lg:pt-5
            '
            >
            {sketches.map(sketch => (
            <div
            key={sketch.id}
            onClick={!deleteMode ? () => setCurrentSketchId(sketch.id) : () => deleteSketch(sketch.id)}
            className='hover:opacity-70 cursor-pointer bg-primary rounded-3xl  max-h-56 overflow-hidden'>
            <div className='h-44 flex flex-col justify-center items-center w-full'>
                <img className='h-44 bg-white w-full object-contain' src={sketch.dataSrc} />
            </div>
            <div className='mt-2 pl-3 font-semibold text-white'>{sketch.title}</div>
            </div>
            ))}

            <div
                onClick={handleAddSketch}
                className='hover:opacity-70 cursor-pointer bg-red-600 rounded-3xl p-5 max-h-56 flex justify-center items-center'>
                <AddCircleIcon className='text-white' />
            </div>
        </div>
        {!deleteMode ?
        <DeleteIcon onClick={() => setDeleteMode(true)} className='cursor-pointer text-white'/>
        :
        <CancelIcon onClick={() => setDeleteMode(false)} className='cursor-pointer text-white'/>
        }
    </div>
  )
}

export default SketchesView
