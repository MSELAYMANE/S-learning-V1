import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TeacherRegisterForm from './pages/TeacherRegisterForm';
import StudentRegisterForm from './pages/StudentRegisterForm';
import LoginForm from './pages/LoginForm'; // 👈 Import login form

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/student" element={<StudentRegisterForm />} />
        <Route path="/register/teacher" element={<TeacherRegisterForm />} />
        <Route path="/login" element={<LoginForm />} /> {/* 👈 Login route */}
        <Route path="/student/dashboard" element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
