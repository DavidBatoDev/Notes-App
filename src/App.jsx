import Sidebar from './components/Sidebar';
import Notes from './components/Notes.jsx';
import TodoList from './components/TodoList.jsx';
import Sketches from './components/Sketches.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import SoundRecord from './components/SoundRecord.jsx';
import Canvas from './components/Canvas.jsx';


function App() {
    return (
      <div className="h-screen bg-violet-900 flex">
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/todolist' element={<TodoList />} />
            <Route path='/sketch' element={<Sketches />} />
            <Route path='/record' element={<SoundRecord />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App
