import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import LogIn from './pages/Login/LogIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';

function App() {

  const [user, setUser] = useState(null);

	console.log(process.env.REACT_APP_NODE_API);

	const handleLogIn = (user) => {
     console.log("LOG IN THE USER");
		 setUser(user);
	};

	const handleLogOut = () => {
     setUser(null);
	};

	console.log("user is ",user);

  return (
    <div className="App">
      <Navbar user={ user } handleLogOut = {handleLogOut} />
			<Routes>
			<Route path="/" element={<Dashboard  user = {user} />} />
			<Route path="/login" element={<LogIn  user={user} handleLogIn={handleLogIn}/> } />
			<Route path="/register" element= {<Register user={user} handleLogIn={handleLogIn} />} />
			</Routes>
    </div>
  );

}

export default App;
