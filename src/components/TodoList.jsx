import React, {useEffect, useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddTodoPopup from './AddTodoPopup';
import Delete from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';


function TodoList() {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || [])
    const [addTodoPopup, setAddTodoPopup] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)


    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }, [todoList])

    const addTodo = (todo, time, date) => {
        const newTodo = {
            id: Date.now(),
            todo: todo,
            time: time,
            date: date,
            completed: false,
        }
        setTodoList([newTodo, ...todoList])
    }

    const deleteTodo = (id) => {
        setTodoList(prev => prev.filter(todo => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodoList(prev => prev.map(todo => todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo))
    }

    return (
        <div className='relative bg-secondary h-full w-full'>
            <div className={`relative flex w-full h-full bg-secondary p-5 ${addTodoPopup && 'blur'}`}>
                {todoList.length === 0 &&
                <div className='flex flex-col w-60'>
                    <h1 className='text-white text-2xl w-full font-semibold'>You have no Todos</h1>
                </div>
                }
                <div className='flex w-full flex-col gap-2 p-10'>
                {todoList.filter(todo => !todo.isComplete).map(todo => (
                    <div key={todo.id} className='relative flex justify-between items-center p-2 bg-primary rounded-3xl h-16 w-full overflow-hidden'>
                        <div className='flex justify-between items-center'>
                            <input onChange={() => toggleComplete(todo.id)} className='rounded-full' type="checkbox" />
                            <h1 className='ml-2 text-white text-md font-semibold'>{todo.todo}</h1>
                        </div>
                        <div className='mr-4 flex flex-col'>
                            <small className='italic text-white font-semibold'>{todo.date}</small>
                            <small className='italic text-white font-semibold'>{todo.time}</small>
                        </div>
                        {deleteMode &&
                        <div onClick={() => deleteTodo(todo.id)} className='absolute right-0 top-0'>
                            <HighlightOffIcon className='text-white cursor-pointer' />
                        </div>
                        }
                    </div>
                ))}
                {todoList.filter(todo => todo.isComplete).length > 0 ? 
                    <h1 className='text-white'>Completed</h1>
                : ""}
                {todoList.filter(todo => todo.isComplete).map(todo => (
                <div className='flex justify-between items-center p-2 bg-primary rounded-3xl h-16 w-full overflow-hidden'>
                    <div className='flex justify-between items-center'>
                        <EditIcon onClick={() => toggleComplete(todo.id)} className='text-white cursor-pointer' />
                        <strike className='ml-2 text-gray-500 text-md font-semibold'>{todo.todo}</strike>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col mr-10'>
                            <strike className='italic text-gray-500 text-xs font-semibold'>{todo.date}</strike>
                            <strike className='italic text-gray-500 text-sm font-semibold'>{todo.time}</strike>
                        </div>
                        <div>
                            <HighlightOffIcon onClick={() => deleteTodo(todo.id)} className='text-white cursor-pointer' />
                        </div>
                    </div>
                </div>                  
                ))}
                </div>
                <div className='flex flex-col justify-start'>
                    {!deleteMode ?
                    <>
                    <Delete onClick={() => setDeleteMode(true)} className='text-white cursor-pointer' />
                    <AddIcon onClick={() => setAddTodoPopup(true)} className='text-white cursor-pointer' />
                    </> 
                    :
                    <>
                    <CancelIcon onClick={() => setDeleteMode(prev => !prev)} className='cursor-pointer text-white'/>
                    </>
                    }
                </div>
            </div>
            {addTodoPopup ?
                <AddTodoPopup 
                    isOpen={addTodoPopup} 
                    onClose={() => setAddTodoPopup(false)}
                    addTodo={addTodo}
                />
            : null}
        </div>
    )
}

export default TodoList
