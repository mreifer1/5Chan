import React, { useEffect } from 'react';

const Authorization = () => {
    //Testing Refresh Tokens
  useEffect(() => {
    const refresh = async () => {
      const token = localStorage.getItem("accessToken");
      if (token != null){
        try{
          const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/user/token`, {
            method: 'POST',
            headers: {
              "Content-Type" : "application/json",
              "Authorization": `Bearer ${token}`,
            }
          });

          if (response.status === 200){ //Token is refreshed
            alert("Session Timer Refreshed.");
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
          } 
          else if (response.status === 403){ //Token is expired
            alert("Logged out due to inactivity");
          }
        }
        catch(error){
          console.error('Error: ', error);
        }
      }
    }
    refresh()
  }, [])

  const auth = async () => {
    //Confirm Login Status (Test)
    const token = localStorage.getItem("accessToken");
    if (token != null){
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/posts/auth`, {
          method: 'GET',
          headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        if (response.status === 200){ //Token is still valid
          const data = await response.json();
          console.log(`Token: ${data}`);
          alert(`Still Logged in as: ${data.name}`);
        } 
        else if (response.status === 403){ //Token is expired
          alert("Logged out due to inactivity");
        }
      }catch(error){
        console.error('Error: ', error);
      }
    }
  };

  auth();

}

export default Authorization;