import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
function Dashboard1({ sidebartoggle, setsidebartoggle }) {
    return (
      <> 
      <div className={`${sidebartoggle ? "ml-64" : ""} w-full`}>
        <Dashboard sidebartoggle={sidebartoggle} setsidebartoggle={setsidebartoggle} />
      </div>
      </>
    );
  }
  
  export default Dashboard1;
  