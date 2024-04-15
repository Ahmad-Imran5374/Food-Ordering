import logo from './logo.svg';
import './index.css';
import Create_account from './components/Create_account';
import Sign from './components/Sign';
import Add_items_admin from './components/Add_items_admin';
import Front_page from './components/Front_page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Dashboard1 from './components/Dashboard1';
import Sidebar from './components/Sidebar';
import Forget from './components/Forget';
import { NameProvider } from './NameContext';
import { useState } from 'react';
import My_Cart from './components/My_Cart';
import Success from './components/Success';
import NOT_found from './components/NOT_found';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Update_profile from './components/Update_profile';
import Fotter from './components/Fotter';
import Admin_signin from './components/Admin_signin';
import Admin_Dashboard from './components/Admin_Dashboard';
import Admin_sidebar from './components/Admin_sidebar';
import Admin_Dashboard1 from './components/Admin_Dasboard1';
import All_users from './components/All_users';
import Admin_orders from './components/Admin_orders';
import Admin_items from './components/Admin_items';
import Update_items from './components/Update_items';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NameProvider> 
        <Routes>
          <Route path='/' element={<Front_page />} />
          <Route path='/admin' element={<Admin_signin/>}/>
          <Route path='/admin_dashboard' element={<Admin_DashboardLayout/>}/>
          <Route path='/signin' element={<Sign />} />
          <Route path='/create_account' element={<Create_account />} />
          <Route path='/dashboard' element={<DashboardLayout/>}/>
          <Route path='/forget_password' element={<Forget/>}/>
          <Route path='/cart' element={<My_Cart/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='*' element={<NOT_found/>}/>
          <Route path='/reports' element={<Reports/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/update_profile' element={<Update_profile/>}/>
          <Route path='/all_users' element={<All_users/>}/>
          <Route path='/admin_orders/:id' element={<Admin_orders/>}/>
          <Route path='/admin_items' element={<Admin_items/>}/>
          <Route path='/update_items/:id/:name/:price/:details/:file' element={<Update_items />} />
          <Route path='/add_newitem' element={<Add_items_admin/>}/>
        </Routes>
        </NameProvider>
      </BrowserRouter>
      {/* <Add_items_admin/> */}
    </div>
  );
}



// Defining a layout component for the /dashboard route
function DashboardLayout()
{
    const [sidebartoggle, setsidebartoggle] = useState(false);
    return(
      <div>
        <Sidebar sidebartoggle={sidebartoggle}/>
        <Dashboard1 sidebartoggle={sidebartoggle} setsidebartoggle={setsidebartoggle}/>
        <Fotter/>
      </div>
    )
}


function Admin_DashboardLayout()
{
  const [sidebartoggle,setsidebartoggle]=useState(false)
  return(
    <>
    <Admin_sidebar sidebartoggle={sidebartoggle}/>
    <Admin_Dashboard1 sidebartoggle={sidebartoggle} setsidebartoggle={setsidebartoggle}/>
    </>
  )
}
export default App;
