import { useState } from "react";

import { FaFileUpload } from "react-icons/fa";

import api from "../api";

export default function UploadRevenue({ refresh }) {
  const [file, setFile] = useState(null);

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) {
      setStatus("Please select a file");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/upload/", formData);

      setStatus(res.data.message);
      await refresh()
    } catch (err) {
      setStatus("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div
        className="
flex
items-center
gap-3
mb-4
"
      >
        <FaFileUpload
          className="
text-blue-600
"
          size={25}
        />

        <h2
          className="
text-lg
font-semibold
"
        >
          Upload Revenue Excel
        </h2>
      </div>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
        className="
block
w-full
border
border-slate-300
rounded-lg
p-2
bg-white'
cursor-pointer
"
      />

      <button
        onClick={upload}
        disabled={loading}
        className="
btn-primary
mt-4
"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>

      {status && (
        <p
          className="
mt-3
text-sm
text-green-600
"
        >
          {status}
        </p>
      )}
    </div>
  );
}
