const BASE_URL = "http://localhost:4000";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return await res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};