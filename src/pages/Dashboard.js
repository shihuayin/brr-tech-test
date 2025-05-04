import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import Card from "../components/Card";
import { STATUS_CLASS } from "../constants";

export default function Dashboard() {
  const { user } = useAuth();
  const { loading, tickets, todos } = useData();

  // redirect unauthenticated user
  if (!user) return <Navigate to="/" replace />;
  // display loading placeholder until get all data
  if (loading)
    return (
      <div className="text-center text-neutral-500 py-12">
        Loading overview…
      </div>
    );

  // if admin, sum(unresolved tickets)
  // if normal user, use all of his/her own tickets
  const visibleTickets = user.isAdmin
    ? tickets.filter((t) => t.status !== "Resolved")
    : tickets;

  const openCount = visibleTickets.filter(
    (t) => t.status !== "Resolved"
  ).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  // latest 3 ticktes
  const latestUpdates = [...visibleTickets]
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 3);

  // get username
  const displayName = (() => {
    const raw = user.email.split("@")[0];
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  })();

  const getStatusStyle = (s) => STATUS_CLASS[s] || STATUS_CLASS.Open;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end bg-white rounded-lg shadow-sm p-6">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Good to see you again, {displayName} !
          </h1>
          <p className="mt-1 text-lg text-neutral-600">
            Here's an overview of your dashboard.
          </p>
        </div>
      </div>

      {/* two cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {/* 1. open tickets */}
        <Card
          title="Open Tickets"
          actions={
            <Link to="/tickets" className="text-primary hover:underline">
              View all →
            </Link>
          }
        >
          <p className="text-5xl font-bold text-primary">{openCount}</p>
        </Card>

        {/* 2. tasks */}
        <Card
          title="My Pending Tasks"
          actions={
            <Link to="/todo" className="text-primary hover:underline">
              View all →
            </Link>
          }
        >
          <p className="text-5xl font-bold text-accent">{pendingCount}</p>
        </Card>
      </div>

      {/* latest updates */}
      <Card
        title="Latest Updates"
        actions={
          <Link to="/tickets" className="text-primary hover:underline">
            View all →
          </Link>
        }
      >
        {latestUpdates.length ? (
          <ul className="mt-4 divide-y divide-neutral-200">
            {latestUpdates.map((t) => (
              <li
                key={t.id}
                className="grid grid-cols-[100px_1fr_auto] items-center py-3"
              >
                {/* date */}
                <span className="text-neutral-500 text-sm">
                  {new Date(t.created).toLocaleDateString("en-GB")}
                </span>

                <div className="flex flex-col">
                  {/* issue */}
                  <span className="text-neutral-800">{t.issue}</span>

                  {/* ↓↓↓↓↓↓↓ only admin can see “submitter” information, name and emial ↓↓↓↓↓ */}
                  {user.isAdmin && (
                    <span className="text-xs text-neutral-500 mt-1">
                      {t.userName} (
                      <a
                        href={`mailto:${t.user}`}
                        className="text-primary hover:underline"
                      >
                        {t.user}
                      </a>
                      )
                    </span>
                  )}
                  {/* ↑↑↑↑↑ only admin can see “submitter” information, name and emial ↑↑↑↑↑↑↑ */}
                </div>
                {/* status */}
                <span
                  role="status"
                  aria-label={`Status: ${t.status}`}
                  className={`${getStatusStyle(
                    t.status
                  )} px-2 py-1 rounded-full text-xs font-medium justify-self-end`}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500 mt-2">No recent updates.</p>
        )}
      </Card>
    </div>
  );
}
