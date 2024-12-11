import React from "react";
import { get, post } from "./apiService";

interface UserInterface {
  id: string;
  name: string;
  age: number;
}

const App = () => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [error, setError] = React.useState("");

  const getUsers = async () => {
    const result = await get("api/users");
    if (!("users" in result)) {
      setError("Could not get users");
    } else {
      console.log(result.users);
      setUsers(result.users);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof Number(age) !== "number" && typeof name !== "string") {
      alert("Put in correct values in the fields");
    } else {
      const response = await post(
        "api/user",
        JSON.stringify({ name: name, age: Number(age) })
      );
      setUsers(response.users);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Enter your age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.name}, {user.age}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
