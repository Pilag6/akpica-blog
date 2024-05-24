import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
  const [admin, setAdmin] = useState(null);
    const [userQuantity, setUserQuantity] = useState(0);

    const MAIN_URL = "http://localhost:3300/admin";

    useEffect(() => {
      const fetchAdmin = async () => {
          try {
              const res = await Axios.get(MAIN_URL, {
                  withCredentials: true
              });
              setAdmin(res.data.user);
              // console.log(res);
          } catch (error) {
              console.log(error);
          }
      };
      fetchAdmin();
  }, []);

    // Set quantity of users
    useEffect(() => {
      if (admin) {
          setUserQuantity(admin.length);
      } else {
          setUserQuantity(0);
      }
  }, [admin]);

  return (
    <UserContext.Provider value={{ admin, userQuantity }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider