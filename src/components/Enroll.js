import React, { useState } from "react";
import { enroll } from "../actions/Enroll";

const Enroll = ({ user,userEnrolled }) => {

	  const [batch,setBatch] = useState(1);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);


		const completePayment = async(e) => {
			e.preventDefault();
      console.log("BATCH selected is ",batch," user email is ",user.email);
			setLoading(true);
			const response = await enroll({email:user.email,batch:batch});
			console.log("RESPONSE IS ",response);
			if(!response.user)
			{
				setError("UNABLE TO MAKE PAYMENT");
			}
			else 
			{
         userEnrolled(response);
				 setError("");
				 setLoading(false);
			}
		};

	  return (
			<section>
				<h3>ENROLLMENT FORM</h3>
				<form className="form" onSubmit={completePayment}>
           <div className="input_container">
						<label htmlFor="amount">FEE</label>
						<input
						  type="number"
							name="amount"
							disabled={true}
							value={500}
						/>
					 </div>
					 <div className="input_container">
						<label htmlFor="timimg">Chosse a time Slot:</label>
						<select id="timing" name="timimg" onChange={ (e) => setBatch(e.target.value) }>
							<option value="1">6-7AM</option>
							<option value="2">7-8AM</option>
							<option value="3">8-9AM</option>
							<option value="4">5-6PM</option>
						</select>
					 </div>
					 {error ? <p className="error">{error}</p> : null}
					 <div className="btn_container">
						<button className="btn in" disabled={loading}>
							{loading ? "Paying... " : "PAY FEE"}
						</button>
        </div>
				</form>
			</section>
		)

};

export default Enroll;