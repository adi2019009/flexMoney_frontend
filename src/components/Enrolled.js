import React from "react";

const Enrolled = ({enrollmentInfo ,user }) => {
	
	console.log("Enrollment Info is ",enrollmentInfo);
  
	const formattedDate = (input) => {
    
		const date = new Date(input);
		return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
	};

	return(
		<section>
			<h4>ENROLLMENT INFO</h4>
			<div className="content">
				 <p className="left_side">NAME :- </p>
				 <p>{user.name}</p>
			</div>
			<div className="content">
				<p className="left_side">EMAIL :- </p>
				<p>{user.email}</p>
			</div>
			<div className="content">
				<p className="left_side">TIMIMG :- </p>
				<p>{enrollmentInfo.start_time}-{enrollmentInfo.end_time} {enrollmentInfo.prefix}</p>
			</div>
			<div className="content">
				<p className="left_side">FEE PAYED ON  :-</p>
				<p>{formattedDate(enrollmentInfo.feepayment_data)}</p>
			</div>
		</section>
	)
};

export default Enrolled;
