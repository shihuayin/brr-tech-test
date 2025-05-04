import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import StaffCard from "../components/StaffCard";

export default function Staff() {
  const { user } = useAuth();
  const { loading, staff: people } = useData();

  // redirect unauthenticated user
  if (!user) return <Navigate to="/" replace />;
  // display loading placeholder until get all data
  if (loading)
    return (
      <div className="text-center text-neutral-500 py-12" aria-live="polite">
        Loading staff…
      </div>
    );

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Staff Directory</h1>

      <section
        aria-labelledby="staff-directory"
        className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 id="staff-directory" className="sr-only">
          Staff Directory
        </h2>

        {/* map for display all staff */}

        {people.map((p) => (
          <StaffCard key={p.id} person={p} isAdmin={user.isAdmin} />
        ))}
      </section>
    </main>
  );
}
