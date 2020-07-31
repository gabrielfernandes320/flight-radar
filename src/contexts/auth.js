import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
  const [data, setData] = useState([{ x: 0, y: 0 }]);
  const [dataGrid, setDataGrid] = useState(null);

  return (
    <AuthContext.Provider
      value={{ data, setData, dataGrid, setDataGrid }}
      {...props}
    />
  );
}

export { AuthProvider, useAuth };
