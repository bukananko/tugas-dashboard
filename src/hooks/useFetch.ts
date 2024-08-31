const useFetch = async <T>(url: string, options?: RequestInit) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const data: T = await fetch(apiUrl + url, {
    ...options,
  }).then((res) => res.json());

  return data;
};

export default useFetch;
