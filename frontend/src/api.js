const BASE_URL = "http://127.0.0.1:8000";

export const api = async (url, method="GET", body=null) => {
  const res = await fetch(BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "token": localStorage.getItem("token")
    },
    body: body ? JSON.stringify(body) : null
  });
  return res.json();
};
