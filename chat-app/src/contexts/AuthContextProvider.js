import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  //states
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) history.push("/chats");
    });
  }, [user, history]);

  return (
    <AuthContext.Provider value={user}>
      {!loading && children}
      {/* <p>test</p> */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
