import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function Welcome() {
  const { user, quickLogin } = useAuth();
  const nav = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <main className="mt-24 max-w-md mx-auto bg-white rounded-xl p-8 shadow-card text-center space-y-6">
      <h1 className="text-3xl font-bold">Welcome to BRR Dashboard</h1>
      <p className="text-sm text-neutral-500">
        Mock login — no credentials needed.
      </p>

      {/* pass different role into quickLogin
    then fetch and expose different data */}

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            quickLogin("user");
            nav("/dashboard", { replace: true });
          }}
          className="btn-primary"
        >
          Login as User
        </button>

        <button
          onClick={() => {
            quickLogin("admin");
            nav("/dashboard", { replace: true });
          }}
          className="btn-accent"
        >
          Login as Admin
        </button>
      </div>
    </main>
  );
}
