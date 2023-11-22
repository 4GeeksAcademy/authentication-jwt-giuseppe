import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	useEffect(() => {
		//si existe un token
		if (store.accessToken) {
			// Esya iniciada la sesion
			navigate("/demo")
		}
	}, [store.accessToken])
	async function login(e) {
		e.preventDefault()
		const data = new FormData(e.target);
		const email = data.get("email");
		const password = data.get("password");
		const { login } = actions
		let resp = await login(email, password)
		console.log(resp)
	}

	return (
		<div className="text-center mt-5">
			<form onSubmit={login}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />

					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>

		</div>
	);
};
