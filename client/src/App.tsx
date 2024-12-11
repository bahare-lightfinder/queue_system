import React from "react";
import { postRequest, getRequest, deleteRequest } from "./apiService";

interface UserInterface {
  id: string;
  name: string;
  age: number;
}

const App = () => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const getUsers = async () => {
    const result = await getRequest("api/users");
    if (!("users" in result)) {
      setError("Could not get users");
    } else {
      setUsers(result.users);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNaN(Number(age)) === true && typeof name === "string") {
      const response = await postRequest(
        "api/post/user",
        JSON.stringify({ name: name, age: Number(age) })
      );
      setUsers(response.users);
      setName("");
      setAge("");
    } else {
      alert("Put in correct values in the fields");
    }
  };
  const removeUser = async (id: string) => {
    const result = await deleteRequest(`api/delete/user/${id}`);
    setUsers(result.users);
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
            type="text"
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
          <button onClick={() => removeUser(user.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default App;
