import { useState, useEffect } from "react";

function useFetch<T>(url: string, request?: RequestInit): [T | undefined, boolean] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUrl();
  }, []);

  async function fetchUrl() {
    const response = await fetch(url, request);
    let json = undefined;

    try {
      json = await response.json();
    } catch (err) {
      console.warn(`Couldn't load the json: ${err}`);
    }

    if (json) {
      setData(json);
      setLoading(false);
    }
  }

  return [data, loading];
}

export { useFetch };
