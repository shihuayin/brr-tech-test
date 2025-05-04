import { useId } from "react";

// dashboard card
// each card include 3 items
// title: Open Tickets, My Pending Tasks, Latest Updates
// actions: view all
// different children
export default function Card({ title, actions, children }) {
  const id = useId();
  const titleId = title ? `${id}-title` : undefined;

  return (
    <article
      aria-labelledby={titleId}
      className="bg-white rounded-lg shadow p-6 w-full max-w-4xl mx-auto"
    >
      {title && (
        <header className="flex items-center justify-between mb-4">
          <h3 id={titleId} className="text-xl font-semibold">
            {title}
          </h3>
          <div>{actions}</div>
        </header>
      )}
      <div>{children}</div>
    </article>
  );
}
