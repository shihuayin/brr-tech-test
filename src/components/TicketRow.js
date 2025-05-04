import { STATUS, STATUS_CLASS } from "../constants";

export default function TicketRow({
  id,
  issue,
  description,
  status,
  createdDate,
  isAdmin,
  userEmail,
  userName,
}) {
  // retrieve the corresponding Tailwind class based on status
  const statusStyle = STATUS_CLASS[status] || STATUS_CLASS[STATUS.OPEN];

  // ensure createdDate is a Date object
  const dateObj =
    createdDate instanceof Date ? createdDate : new Date(createdDate);

  return (
    <article
      aria-labelledby={`ticket-${id}-issue`}
      className="bg-white rounded-lg shadow p-4"
    >
      <header className="flex items-center justify-between mb-2">
        {/* issue */}
        <h4 id={`ticket-${id}-issue`} className="text-lg font-semibold">
          {issue}
        </h4>

        {/* status */}
        <span
          role="status"
          aria-label={`Status: ${status}`}
          className={`${statusStyle} px-2 py-1 rounded-full text-xs font-medium`}
        >
          {status}
        </span>
      </header>
      {/* description */}
      <p className="text-sm text-neutral-700 mb-2">{description}</p>

      <footer className="text-xs text-neutral-500 space-y-1">
        {/* submit time */}
        <time dateTime={dateObj.toISOString()} className="block">
          Created: {dateObj.toLocaleString()}
        </time>

        {/* ↓↓↓↓↓↓↓ only admin can see submiter ↓↓↓↓↓ */}
        {isAdmin && (
          <div>
            Submitted&nbsp;by:&nbsp;
            {userName ? `${userName} (` : ""}
            <a
              href={`mailto:${userEmail}`}
              className="text-primary underline focus:outline-none"
            >
              {userEmail}
            </a>
            {userName ? ")" : ""}
          </div>
        )}

        {/* ↑↑↑↑↑ only admin can see submiter ↑↑↑↑↑↑↑ */}
      </footer>
    </article>
  );
}
