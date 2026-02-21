import { useState } from "react";
import { createRental } from "../api/api";

export default function ProductDetail({ product, client }) {
  const [hours, setHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client) return alert("Please login first!");

    const res = await createRental({
      product_id: product.id,
      client_id: client.id,
      duration_hours: parseInt(hours),
    });
    alert(`Rental requested! ID: ${res.id}`);
    setHours("");
  };

  return (
    <div className="max-w-md mx-auto border p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <p>Hour: ${product.price_hour} | Day: ${product.price_day}</p>
      <p className="mb-2">City: {product.city}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3">
        <input
          type="number"
          placeholder="Rental duration in hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded">
          Request Rental
        </button>
      </form>
    </div>
  );
}