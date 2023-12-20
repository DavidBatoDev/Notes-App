// AddTodoPopup.js
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const AddTodoPopup = ({ isOpen, onClose, addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);

  const period = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      if (date === "" && time === "") {
        addTodo(newTodo, "", "")
      }
      else if (date === "") {
        const formattedTime = formatTime(time)
        addTodo(newTodo, formattedTime, "")
      } else if (time === "") {
        addTodo(newTodo, "", date)
      }
    else {
      const formattedTime = formatTime(time)
      addTodo(newTodo, formattedTime, date)
    }
      setNewTodo('');
      onClose();
    }
  };

  return (
    <div className={`z-50 absolute inset-0 ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-solid bg-white p-4 rounded-3xl w-96">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="todo">
              New Todo
            </label>
            <input
              className="bg-transparent border-black w-full border rounded-3xl py-2 px-3"
              placeholder='Enter todo'
              type="text"
              id="todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className='mt-3'>
              <small>
                Set Alert
              </small>
              <div>
                <input onChange={e => setDate(e.target.value)} type="date" className='border-black rounded-3xl mr-3 bg-transparent border'/>
                <TimePicker onChange={setTime} value={time} className='rounded-3xl bg-white' />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-3xl py-2 px-4"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
            <button
              className="ml-2 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-3xl"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoPopup;
