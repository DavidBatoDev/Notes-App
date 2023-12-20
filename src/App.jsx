import Sidebar from './components/Sidebar';
import Notes from './components/Notes.jsx';
import TodoList from './components/TodoList.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'


function App() {
    return (
      <div className="h-screen bg-violet-900 flex">
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/todolist' element={<TodoList />} />
            <Route path='/sketch' element={<Notes />} />
            <Route path='/record' element={<Notes />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App
