import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Enroll from "../../components/Enroll";
import Enrolled from "../../components/Enrolled";
import { checkEnrollment } from "../../actions/CheckEnrollment";

const Dashboard = ( { user } ) => {

	const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
	const [isEnrolled,setIsEnrolled] = useState(false);
	const [enrollmentInfo,setEnrllmentInfo] = useState();

	useEffect(()=>{
   if(!user)
	   navigate('/login');  
	},[user])

	useEffect(() => {

		async function fetchData(user) {
			// You can await here
			const response = await checkEnrollment({"email" : user?.email});
			console.log("response enrollment check");
			console.log(response);
			if(response.enrollment === "YES")
			{
				setIsEnrolled(true);
				setEnrllmentInfo(response);
			}
			setLoading(false);
			// ...
		}

		console.log("Calling fetch Data ");
		fetchData(user);
	}, [user]);

	const userEnrolled = (enroll_info) => {
		setEnrllmentInfo(enroll_info);
		setIsEnrolled(true);
	}

	if(loading)
	  return <p>Loading.....</p>

	return (
		<div>
			{isEnrolled ? <Enrolled enrollmentInfo={enrollmentInfo} user = {user} /> : <Enroll user = {user} userEnrolled={userEnrolled} />}
		</div>
	)
};

export default Dashboard;
