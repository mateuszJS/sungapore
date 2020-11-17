const fetchApi = async <T>(url: string, options: RequestInit): Promise<T> => {
  const res = await fetch(url, options)
  return res.json() as Promise<T>
}

export default fetchApi
