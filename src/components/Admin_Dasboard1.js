import Navbar from "./Navbar";
import Admin_Dashboard from "./Admin_Dashboard";
function Admin_Dashboard1({ sidebartoggle, setsidebartoggle }) {
    return (
      <> 
      <div className={`${sidebartoggle ? "ml-64" : ""} w-full`}>
        <Admin_Dashboard sidebartoggle={sidebartoggle} setsidebartoggle={setsidebartoggle} />
      </div>
      </>
    );
  }
  
  export default Admin_Dashboard1;
  