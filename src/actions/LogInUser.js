export const logInUser = async (data) => {
	const response = await fetch(`${process.env.REACT_APP_NODE_API}/users/login`,{
	method:"POST",
	headers:{
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	},
	body: JSON.stringify(data),
})
  const responseData = await response.json();
  return responseData;
};

