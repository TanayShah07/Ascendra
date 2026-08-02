import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Interview from "./pages/Interview/Interview";
import ProtectedRoute from "./routes/ProtectedRoute";
import MockInterview from "./pages/MockInterview/MockInterview";
import CompanyInterview from "./pages/CompanyInterview/CompanyInterview";

function App() {

    return (

        <>

            <Toaster position="top-right" />

            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <Interview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview/mock"
                    element={
                    <ProtectedRoute>
                    <MockInterview/>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview/company"
                    element={
                    <ProtectedRoute>
                    <CompanyInterview/>
                    </ProtectedRoute>
                    }
                />
            </Routes>


        </>

    );

}

export default App;