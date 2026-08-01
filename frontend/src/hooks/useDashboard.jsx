import { useCallback, useEffect, useState } from "react";
import api from "../api";

const CACHE_KEY = "revenue_dashboard_cache";
const CACHE_TIME = 5 * 60 * 1000;

export default function useDashboard({
  month = "",
  search = "",
} = {}) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(
    async ({ force = false } = {}) => {
      try {
        setLoading(true);
        setError("");

        const normalizedSearch = search.trim();

        const hasFilters = Boolean(
          month || normalizedSearch
        );

        /*
         * Only use the general dashboard cache when
         * there are no active filters.
         */
        if (!force && !hasFilters) {
          const cachedValue =
            localStorage.getItem(CACHE_KEY);

          if (cachedValue) {
            const cached = JSON.parse(cachedValue);

            const isExpired =
              Date.now() - cached.timestamp >
              CACHE_TIME;

            if (!isExpired) {
              setDashboard(cached.data);
              return;
            }
          }
        }

        const response = await api.get(
          "/dashboard/",
          {
            params: {
              month: month || undefined,
              search:
                normalizedSearch || undefined,
            },
          }
        );

        /*
         * This must run after every API request.
         */
        setDashboard(response.data);

        /*
         * Only cache the unfiltered dashboard.
         */
        if (!hasFilters) {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              data: response.data,
            })
          );
        }
      } catch (err) {
        console.error(
          "Dashboard request failed:",
          err
        );

        setError(
          err.response?.data?.error ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    },
    [month, search]
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const refresh = useCallback(async () => {
    localStorage.removeItem(CACHE_KEY);
    await loadDashboard({ force: true });
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh,
  };
}