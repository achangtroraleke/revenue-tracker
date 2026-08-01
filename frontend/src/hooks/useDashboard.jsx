import { useCallback, useEffect, useState } from "react";
import api from "../api";

export default function useDashboard({
  month = "",
  search = "",
} = {}) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError("");

        const normalizedSearch = search.trim();

        console.log("Dashboard request:", {
          month,
          search: normalizedSearch,
        });

        const response = await api.get("/dashboard/", {
          params: {
            month: month || undefined,
            search: normalizedSearch || undefined,
          },
          signal,
        });

        setDashboard(response.data);
      } catch (err) {
        if (
          err.name === "CanceledError" ||
          err.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error("Dashboard request failed:", err);

        setError(
          err.response?.data?.error ||
            "Unable to load dashboard data."
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [month, search]
  );

  useEffect(() => {
    const controller = new AbortController();

    loadDashboard(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadDashboard]);

  const refresh = useCallback(async () => {
    const controller = new AbortController();
    await loadDashboard(controller.signal);
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh,
  };
}