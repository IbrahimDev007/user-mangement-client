import { useEffect, useState } from "react";

import "./App.css";

function App() {
	const [user, setUser] = useState([]);
	useEffect(() => {
		fetch("http://localhost:5000/users")
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const user = { name, email };
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				const newUser = [...user, data];
				setUser[newUser];
				form.reset();
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h1>User Managment System</h1>
			<p>Total User: {user.length}</p>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" />
				<br />
				<input type="email" name="email" />
				<br />
				<input type="submit" value="Add User" />
			</form>

			{user.map((user) => {
				return (
					<div key={user.id}>
						<p>
							Name: {user.name}
							{user.email}
						</p>
					</div>
				);
			})}
		</>
	);
}

export default App;
