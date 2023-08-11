import Login from "./pages/Login";
import { FaUser } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import JobList from "./pages/JobList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import JobDetail from "./pages/JobDetail";

type authContextType = {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};
export const AuthContext = createContext<authContextType>(
  {} as authContextType
);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = () => {
    setIsSignedIn(true);
  };
  const signOut = () => {
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route
            path="job"
            element={
              <ProtectedRoute isSignedIn={isSignedIn}>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="job-detail"
            element={
              <ProtectedRoute isSignedIn={isSignedIn}>
                <JobDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
