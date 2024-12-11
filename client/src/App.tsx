import React from "react";

const App = () => {
  const [backendData, setBackendData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState<number | undefined>(undefined);

  const fetchData = async () => {
    // const res =await fetch("/api");
    // const jsonRes = await res.json();
    // console.log('jsonRes', jsonRes)
  };
  const handleSubmit = async () => {};

  React.useEffect(() => {
    fetchData();
  }, []);
  console.log("efwdwe");
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
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;
