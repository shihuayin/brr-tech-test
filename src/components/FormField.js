import React from "react";

export default function FormField({ label, htmlFor, children }) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
