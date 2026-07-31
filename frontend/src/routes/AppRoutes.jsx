import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Interview from "../pages/Interview/Interview";
import GroupDiscussion from "../pages/GroupDiscussion/GroupDiscussion";
import Feedback from "../pages/Feedback/Feedback";
import Roadmap from "../pages/Roadmap/Roadmap";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/group-discussion" element={<GroupDiscussion />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;