import { Link } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

export function HomePage() {
  const user = useAuthStore((s) => s.user);
  return (
    <section className="nv-hero">
      <h1>NoteVault</h1>
      <p>Secure personal notes with real-time search.</p>
      {user ? (
        <Link to="/notes" className="nv-btn nv-btn-primary">
          Open my notes
        </Link>
      ) : (
        <div className="nv-hero-actions">
          <Link to="/register" className="nv-btn nv-btn-primary">
            Get started
          </Link>
          <Link to="/login" className="nv-btn">
            Sign in
          </Link>
        </div>
      )}
    </section>
  );
}
