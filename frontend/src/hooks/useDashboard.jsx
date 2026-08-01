import { useState, useEffect } from "react";
import api from "../api";

const CACHE_KEY = "revenue_dashboard_cache";
const CACHE_TIME = 1 * 60 * 1000; // 5 minutes

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  async function loadDashboard(force = false) {
    const cached = localStorage.getItem(CACHE_KEY);

    if (!force && cached) {
      const parsed = JSON.parse(cached);

      const expired = Date.now() - parsed.timestamp > CACHE_TIME;

      if (!expired) {
        setDashboard(parsed.data);

        setLoading(false);

        return;
      }
    }

    const response = await api.get("/dashboard/");

    const cacheData = {
      timestamp: Date.now(),

      data: response.data,
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

    setDashboard(response.data);

    setLoading(false);
  }

  function clearCache() {
    localStorage.removeItem(CACHE_KEY);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,

    loading,

    refresh: () => loadDashboard(true),

    clearCache,
  };
}
