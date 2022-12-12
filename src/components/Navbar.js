import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ user , handleLogOut}) => {


  const navigate = useNavigate();

  const handleSingOut = () => {
   /* Complete Sing Out */
		handleLogOut();
  };


  return (
    <nav>
      <div className="app_name">
        <h3>
          <Link to="/">FLEX MONEY</Link>
        </h3>
      </div>
      <div>
        {user ? (
          <>
            <button className="btn out" onClick={handleSingOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
