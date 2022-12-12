import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../actions/RegisterUser';

const Register = ({ user,handleLogIn }) => {

	const navigate = useNavigate(); 

	const [data,setData] = useState({
		name:"",
		email:"",
		password:"",
		dob: null,
		error: null,
		loading: false,
	});

	const { name , email , password, dob, error, loading } = data;

	const handleChange = (e) => {
		setData({...data,[e.target.name]: e.target.value});
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log(data);

		setData({...data,error:null,loading:true});
		if(!name || !email || !password)
		{
			setData({...data,error:"All feilds are required"});
			return;
		}

		try{
			 
			console.log("DATE is ",dob);
      var d = new Date(dob);
			console.log('data is ',d);
      var curr = new Date();
			const year = d.getFullYear();
			const curr_year = curr.getFullYear();

			if(curr_year-year < 18)
			{
				setData({...data,loading:false,error:"AGE MUST BE ABOVE 18"});
			}
			else if(curr_year-year >= 65)
			{
				setData({...data,loading:false,error:"AGE MUST BE BELOW 65"});
			}
			else 
			{
					const response = await registerUser({'name':name,'email':email,'dob':dob,'password':password})
					if(response.user)
					{
						setData({
							email: "",
							password: "",
							error: null,
							loading: false,
						});
						handleLogIn(response.user);
					}
					else 
					{
						setData({
							...data,
							error:"Unable to Register.Please Try Again Later",
							loading:false
						});
					}
		  }
		 } catch(err){
			console.log("Error is ",err);
			setData({...data,error: err.message,loading:false});
		   }
	}

	useEffect(()=>{
    if(user)
		  navigate('/');
	},[user])

	return (
    <section>
      <h3>Create An Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
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
				<div className="input_container">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn in" disabled={loading}>
            {loading ? "Registering... " : "Register"}
          </button>
        </div>
      </form>
    </section>
	)
};

export default Register;