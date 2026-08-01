import { useCallback, useEffect, useState } from "react";
import api from "../api";

export default function useDashboard({ month = "", search = "" } = {}) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/dashboard/", {
        params: {
          // Axios excludes these when they are undefined.
          month: month || undefined,
          search: search.trim() || undefined,
        },
      });

      setDashboard(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, [month, search]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh: loadDashboard,
  };
}