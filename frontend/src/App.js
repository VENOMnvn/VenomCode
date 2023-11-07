import './App.css';
import Navbar from './components/Navbar';
import Register from './components/register';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Navbar></Navbar>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </div>
  );
}

export default App;
