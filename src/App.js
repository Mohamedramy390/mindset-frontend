import { Route, Routes } from "react-router-dom";
import './App.css';
import Signup from './Components/LoginSignup/Signup';
import Login from './Components/LoginSignup/Login';
import TeacherDashboard from './Components/TeacherSide/TeacherDashboard';
import CreateRoom from "./Components/TeacherSide/CreateRoom";
import Rooms from "./Components/StudentSide/Rooms";
import StudentRoom from "./Components/StudentSide/StudentRoom";
import MyRooms from "./Components/MyRooms";
import { TeacherRoom } from "./Components/TeacherSide/TeacherRoom";
import HowToUse from "./Components/Common/HowToUse";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        
        {/* Teacher-Only Routes */}
        <Route 
          path="/Dashboard" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/CreateRoom" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <CreateRoom />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rooms/:id/teacher" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherRoom />
            </ProtectedRoute>
          } 
        />
        
        {/* Student-Only Routes */}
        <Route 
          path="/rooms" 
          element={
            <ProtectedRoute requiredRole="student">
              <Rooms />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="rooms/:id/student" 
          element={
            <ProtectedRoute requiredRole="student">
              <StudentRoom />
            </ProtectedRoute>
          } 
        />
        
        {/* Authenticated Routes (Both Roles) */}
        <Route 
          path="/my-rooms" 
          element={
            <ProtectedRoute>
              <MyRooms />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
