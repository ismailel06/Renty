import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { fetchProducts } from "../api/api";

export default function ProductDetailPage({ client }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      const found = data.find((p) => p.id === parseInt(id));
      setProduct(found);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return <ProductDetail product={product} client={client} />;
}