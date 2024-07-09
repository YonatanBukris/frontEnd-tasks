
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TasksPage from "./pages/TasksPage";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import { useUserContext } from "./components/userProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import { Skeleton } from "./components/ui/skeleton";
import ProfilePage from "./pages/ProfilePage";



function App() {
  return (
    <>      
      <Routes>
      <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="task" element={< TasksPage />} />
          <Route path="task/:taskId" element={< TaskDetailsPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*/" element={<NotFoundPage />} />
    </Routes>

    <Toaster />
    </>
  );
}

export default App;
