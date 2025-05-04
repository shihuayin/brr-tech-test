export default function StaffCard({ person, isAdmin }) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        {/* name and role */}
        <div>
          <h3 className="text-lg font-semibold">{person.name}</h3>
          <p className="text-sm text-gray-500">{person.role}</p>
        </div>
        {/* status */}
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            person.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {person.status}
        </span>
      </div>

      <hr className="my-4" />

      <div className="space-y-1 text-sm">
        {/* email */}
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a href={`mailto:${person.email}`} className="text-indigo-600">
            {person.email}
          </a>
        </p>

        {/* ↓↓↓↓↓↓↓ only admin can see ↓↓↓↓↓ */}
        {isAdmin && (
          <>
            <p>
              <span className="font-medium">Last Login:</span>{" "}
              {new Date(person.lastLogin).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Drive Usage:</span>{" "}
              {person.driveUsage}
            </p>
            <p>
              <span className="font-medium">Device:</span> {person.device}
            </p>
          </>
        )}

        {/* ↑↑↑↑↑ only admin can see ↑↑↑↑↑↑↑ */}
      </div>
    </div>
  );
}
