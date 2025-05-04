// global shared constant, for dashboard, tickets page
export const STATUS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

export const STATUS_ORDER = [STATUS.OPEN, STATUS.IN_PROGRESS, STATUS.RESOLVED];

export const STATUS_CLASS = {
  [STATUS.OPEN]: "bg-gray-300 text-gray-800",
  [STATUS.IN_PROGRESS]: "bg-yellow-100 text-yellow-800",
  [STATUS.RESOLVED]: "bg-green-100 text-green-800",
};
