import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { addTicket } from "../services/firestore";
import FormField from "../components/FormField";

// issues
const ISSUE_TYPES = [
  "Printer Jam",
  "VPN Access",
  "Password Reset",
  "Software Install",
  "Other",
];

export default function ITRequest() {
  const { user } = useAuth();
  const { refresh } = useData();
  const nav = useNavigate();
  const [issue, setIssue] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) return <Navigate to="/" replace />;

  // simulate file upload
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setUploading(true);
    setUploadedName("");
    // simulate a 2-second upload
    setTimeout(() => {
      setUploading(false);
      setUploadedName(selected.name);
    }, 2000);
  };

  // submit form, include email, issue and description
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await addTicket({
      user: user.email,
      issue,
      description: desc,
    });

    await refresh(true);
    nav("/tickets");
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl p-10 shadow-card space-y-8">
      <h2 className="text-3xl font-semibold text-neutral-900">
        Submit IT Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Issue Type" htmlFor="issue-select">
          {/* issue selector */}
          <select
            id="issue-select"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">Select an issue</option>
            {ISSUE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>

        {/* description */}
        <FormField label="Description" htmlFor="desc-textarea">
          <textarea
            id="desc-textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={5}
            required
          />
        </FormField>

        {/* file, simulate upload */}
        <FormField label="File (optional)" htmlFor="file-input">
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            className="w-full"
          />
          {uploading && (
            <p className="text-sm text-neutral-500 mt-2">Uploading...</p>
          )}
          {!uploading && uploadedName && (
            <p className="text-sm text-neutral-500 mt-2">
              Uploaded: {uploadedName}
            </p>
          )}
        </FormField>

        {/* submit button */}
        <button
          type="submit"
          disabled={!issue || !desc || submitting || uploading}
          className="w-full btn-primary py-4 text-lg disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
