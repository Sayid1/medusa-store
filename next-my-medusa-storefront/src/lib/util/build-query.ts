export const buildQuery = (search: Record<string, any>) => {
  if (search && Object.keys(search).length)
    return (
      "?" +
      Object.keys(search)
        .map((k) => `${k}=${search[k]}`)
        .join("&")
    )
  return ""
}
