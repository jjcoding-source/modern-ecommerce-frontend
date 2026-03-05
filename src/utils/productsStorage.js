import productsData from "../data/products";

export function getAllProducts() {
  const stored = localStorage.getItem("admin_products");

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return productsData;
    }
  }

  return productsData;
}