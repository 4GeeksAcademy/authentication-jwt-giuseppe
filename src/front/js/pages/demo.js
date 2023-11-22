import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const { userData, setUserData } = useState(null);
	const navigate = useNavigate()
	useEffect(() => {
		if (store.accessToken) {
			actions.getUserInfo().then(data => setUserData(data))
		} else {
			Navigate("/")
		}
	}, [store.accessToken])

	return (
		<div className="container">
			<p>{userData == "ok" ? JSON.stringify(store.userInfo) : userData}</p>

		</div>
	);
};
