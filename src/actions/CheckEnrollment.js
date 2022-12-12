export const checkEnrollment = async (data) => {
	const response = await fetch(`${process.env.REACT_APP_NODE_API}/check_enroll`,{
	method:"POST",
	headers:{
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	},
	body: JSON.stringify(data),
})
  const response_data = await response.json();
  return response_data;
};

