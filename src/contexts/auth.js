import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);
const defaultUser = {
  email: "sandra@example.com",
  avatarUrl:
    "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png",
};

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
