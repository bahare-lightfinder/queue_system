import React from 'react';

const App = () => {
  const [backendData, setBackendData] = React.useState([]);

  const fetchData = async ()=> {
    const res =await fetch("/api");
    const jsonRes = await res.json();
    console.log('jsonRes', jsonRes)
  };

  React.useEffect(()=>{
    fetchData();

  }, [])
  console.log('efwdwe')
  return (
    <div>
      hello
    </div>
  );
}

export default App;
