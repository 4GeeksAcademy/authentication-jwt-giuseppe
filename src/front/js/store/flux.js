const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			userInfo: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			apiFecthPublic: async (endpoint, method = "Get", body = null) => {
				var request
				//si la peticion es Get
				if (method == "Get") {
					//se hace un fetch sencillo
					request = fetch(process.env.Backend_url + "/api" + endpoint)
				} else {
					//se crea el objeto parametros con todo lo necesario para la peticion
					const params = {
						method,
						headers: {
							"Content-Type": "application/json"
						}
					}
					// si hay un body se agrega a los parametros
					if (body) params.body = JSON.stringify(body)
					//La peticion termina siendo al endpoint con los parametros que se definieron
					request = fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
				}
				const resp = await request
				const data = await resp.json()
				return { code: resp.status, data }
			},
			apiFecthProtected: async (endpoint, method = "Get", body = null) => {
				const { accessToken } = getStore()
				if (!accessToken) {
					return "no token"
				}
				const params = {
					method,
					headers: {
						"Authorization": "Bearer" + accessToken
					}
				}

				// si hay un body se agrega a los parametros
				if (body) {
					params.headers["Content-Type"] = "application/json"
					params.body = JSON.stringify(body)
				}
				//La peticion termina siendo al endpoint con los parametros que se definieron
				const resp = await fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
				const data = await resp.json()
				return { code: resp.status, data }
			},
			loadTokens: () => {
				let token = localStorage.getItem("accessToken")
				setStore({ accessToken: token })
			},
			login: async (email, password) => {
				const { apiFecthPublic } = getActions()
				const resp = await apiFetchPublic("/login", "Post", { email, password })
				if (resp - code != 200) {
					console.error("Login error")
					return null
				}
				console.log({ resp })
				const { message, token } = resp.data
				localStorage.setItem("accessToken", token)
				setStore({ accessToken })
				return message
			},
			singnup: (email, password) => {

			},
			getInfo: async () => {
				const { apiFecthProtected } = getActions()
				const resp = await apiFecthProtected("/helloprotected")
				setStore({ userInfo: resp.data })
				return "ok"
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const { apiFetchPublic } = getActions()
					const data = await apiFetchPublic("/hello")
					setStore({ message: data.data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
