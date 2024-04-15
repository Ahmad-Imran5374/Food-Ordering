import logo from './logo.svg';
// import './App.css';
import './index.css'
import Create_account from './components/Create_account';
import Sign from './components/Sign';
import Add_items_admin from './components/Add_items_admin';
import Front_page from './components/Front_page';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Front_page/>}></Route>
        <Route path='/signin' element={<Sign/>}></Route>
        <Route path='/create_account' element={<Create_account/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    {/* <Create_account/>
     <Sign/> */}
    {/* <Add_items_admin/> */}
    {/* <Front_page/> */}
    </div>
  );
}

export default App;
