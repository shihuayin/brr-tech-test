import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import TicketRow from "../components/TicketRow";
import { STATUS_ORDER, STATUS_CLASS } from "../constants";

const STATUS_OPTIONS = ["All", ...STATUS_ORDER];

export default function Tickets() {
  const { user } = useAuth();
  const { loading, tickets } = useData();
  const [selectedStatus, setSelectedStatus] = useState("All");

  if (!user) return <Navigate to="/" replace />;
  if (loading)
    return (
      <div className="text-center text-neutral-500 py-12" aria-live="polite">
        Loading tickets…
      </div>
    );

  // filtering
  const filtered =
    selectedStatus === "All"
      ? tickets
      : tickets.filter((t) => t.status === selectedStatus);

  // calculate number of tickets for each status
  const summary = STATUS_ORDER.reduce(
    (acc, s) => ({
      ...acc,
      [s]: tickets.filter((t) => t.status === s).length || 0,
    }),
    {}
  );

  return (
    <main className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Tickets</h1>

        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="font-medium">
            Filter by status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* status  */}
      <div className="flex flex-wrap gap-3 mb-6" aria-label="Ticket summary">
        {STATUS_ORDER.map((s) => (
          <span
            key={s}
            className={`${STATUS_CLASS[s]} px-3 py-1 rounded-full text-sm font-medium`}
          >
            {s}: {summary[s]}
          </span>
        ))}
      </div>

      {/* ticktes list */}
      {filtered.length === 0 ? (
        <p className="text-neutral-500">
          {selectedStatus === "All"
            ? "No tickets found."
            : `No tickets with status "${selectedStatus}".`}
        </p>
      ) : (
        <section aria-labelledby="tickets-list" className="space-y-6">
          <h2 id="tickets-list" className="sr-only">
            Tickets List
          </h2>
          {filtered.map((t) => (
            <TicketRow
              key={t.id}
              {...t}
              isAdmin={user.isAdmin}
              userEmail={t.user}
              userName={t.userName}
            />
          ))}
        </section>
      )}
    </main>
  );
}
