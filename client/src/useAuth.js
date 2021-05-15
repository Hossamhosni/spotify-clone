import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	useEffect(() => {
		async function login() {
			try {
				const response = await axios.post(
					"http://localhost:8000/login",
					{ code }
				);
				setAccessToken(response.data.accessToken);
				setRefreshToken(response.data.refreshToken);
				setExpiresIn(response.data.expiresIn);
			} catch (e) {
				console.log(e);
				window.location = "/";
			}
		}
		login();
	}, [code]);

	useEffect(() => {
		async function refresh() {
			try {
				const response = await axios.post(
					"http://localhost:8000/refresh",
					{
						refreshToken,
					}
				);
				setAccessToken(response.data.accessToken);
				setExpiresIn(response.data.expiresIn);
			} catch (e) {
				console.log(e);
				window.location = "/";
			}
		}
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(refresh, (expiresIn - 60) * 1000);
		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	return accessToken;
}
