import { Route, Routes } from 'react-router-dom';
import Navbar   from './components/Navbar';
import Home     from './views/Home';
import ListPage from './views/ListPage';
import DNDpage  from './views/DNDpage';
import DNDmultiplePage from './views/DNDmultiplePage';
import './style/App.css';

function App() {
  return (
    <div >
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/listpage' element={<ListPage/>}/>
          <Route path='/dndpage'  element={<DNDpage/>}/>
          <Route path='/dndmultiplepage' element={<DNDmultiplePage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
