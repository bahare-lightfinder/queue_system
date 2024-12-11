// apiService.js

    const get = async (url: string):Promise<any> => {
       
      try {
            const response = await fetch(url);
            if (!response.ok) {
              return { error:response.status };
            }
        
            const jsonRes = await response.json();
            return await jsonRes; // Parse the JSON response
          } catch (error) {
            console.error("Error making API request:", error);
            return error // Re-throw the error for the caller to handle
          }
    };
    

    const post = async (url:string, data: string) => {
      try {
        const response = await fetch("api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data // OR  body: JSON.stringify({data}) OR JSON.stringify(data)
        });
  
        if (!response.ok) {
          return { error: response.status };
        }
        const jsonResponse = await response.json();
        return await jsonResponse; // Parse the JSON response
      } catch (error) {
        console.error("Error:", error);
      }
    }
 
    

 
export { get, post };



