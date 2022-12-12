import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from '../../actions/LogInUser';

const Login = ({ user,handleLogIn }) => {

  let navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

	const { email, password, error, loading } = data;


	useEffect(()=>{
		if(user)
		  navigate("/");
	},[user])

	const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
      return;
    }

    try {

			const response = await logInUser({'email':email,'password':password});
			console.log("response is ",response);
      
			if(!response.user)
			  setData({...data,error:"Invalid Credentials",loading:false});
      else 
			{
				setData({
					email: "",
					password: "",
					error: null,
					loading: false,
				});
				handleLogIn(response.user);
			}
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };


  return (
    <section>
      <h3>Log In</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn in" disabled={loading}>
            {loading ? "Logging..." : "Log In"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
