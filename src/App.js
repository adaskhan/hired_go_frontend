import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import AppliedJobs from "./pages/user/AppliedJobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecruiterRegister from './pages/RecruiterRegister'
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import "./stylesheets/custom-components.css";
import "./stylesheets/layout.css";
import Profile from "./pages/user/profile";
import PostedJobs from "./pages/user/postedjobs";
import NewEditJob from "./pages/user/postedjobs/NewEditJob";
import LoginAsAdmin from "./pages/LoginAsAdmin";
import LoginAsRecruiter from "./pages/LoginAsRecruiter";

import AllJobs from "./pages/admin/AllJobs";
import Allusers from "./pages/admin/AllUsers";
import JobDescription from "./pages/JobDescription";
import Notifications from "./pages/Notifications";
import MapPage from "./pages/MapPage";
import UserProfile from "./pages/user/profile/UserProfile"
import AllRecruiters from "./pages/admin/AllRecruiters";

function App() {
  const { loading } = useSelector((state) => state.alert);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path='/recruiter_register'
            element={
              <PublicRoute>
                <RecruiterRegister />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              user 
                ? <ProtectedRoute><Home /></ProtectedRoute>
                : <PublicRoute><Home /></PublicRoute>
            }          
          />
          <Route
            path='/admin_login'
            element={
              <PublicRoute>
                <LoginAsAdmin/>
              </PublicRoute>
            }
          />
          <Route
            path='/recruiter_login'
            element={
              <PublicRoute>
                <LoginAsRecruiter/>
              </PublicRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PublicRoute>
                <MapPage/>
              </PublicRoute>
            }
          />
          <Route
            path='/job-description/:id'
            element={
              <ProtectedRoute>
                <JobDescription />
              </ProtectedRoute>
            }
          />
          <Route
            path='/applied-jobs'
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path='/posted-jobs'
            element={
              <ProtectedRoute>
                <PostedJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posted-jobs/new"
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs/edit/:id"
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Allusers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/recruiters"
            element={
              <ProtectedRoute>
                <AllRecruiters />
              </ProtectedRoute>
            }
          />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
