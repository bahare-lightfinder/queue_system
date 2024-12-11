    const getRequest = async (url: string):Promise<any> => {
       
      try {
            const response = await fetch(url);
            if (!response.ok) {
              return { error:response.status };
            }
            const jsonRes = await response.json();
            return await jsonRes; // Parse the JSON response
          } catch (error) {
            return error // Re-throw the error for the caller to handle
          }
    };
    

    const postRequest = async (url:string, data: string) => {
      try {
        const response = await fetch(url, {
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
        return error 
      }
    };


    const deleteRequest = async (url:string) => {
      try {
        const response = await fetch(url, {
          method: "DELETE"
        });
  
        if (!response.ok) {
          return { error: response.status };
        }
        const jsonResponse = await response.json();
        return await jsonResponse; // Parse the JSON response
      } catch (error) {
        return error 
      }
    }
 
    

 
export { getRequest, postRequest, deleteRequest };



