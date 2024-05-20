export const TokenConfig = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No token available")
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return config
}