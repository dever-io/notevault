import { Link, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useAuthStore } from "./store/authStore";

function NavBar() {
  const { user, logout } = useAuthStore();
  return (
    <nav className="nv-nav">
      <Link to="/" className="nv-brand">
        NoteVault
      </Link>
      <div className="nv-nav-links">
        {user ? (
          <>
            <Link to="/notes">Notes</Link>
            <span className="nv-user">{user.email}</span>
            <button type="button" className="nv-link-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function App() {
  return (
    <div className="nv-app">
      <NavBar />
      <main className="nv-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
