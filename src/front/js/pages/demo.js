import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const { accessToken, userInfo } = store;  // Desestructura las variables necesarias
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			if (accessToken) {
				const data = await actions.getUserInfo();
				setUserData(data);
			} else {
				navigate("/");
			}
		};

		fetchData();
	}, [accessToken, navigate]);

	return (
		<div className="container">
			<p>{userData ? JSON.stringify(userInfo) : userData}</p>
		</div>
	);
};

