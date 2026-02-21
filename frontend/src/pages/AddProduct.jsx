import { useState } from "react";
import { createProduct } from "../api/api";

export default function AddProduct({ providerId }) {
  const [form, setForm] = useState({
    provider_id: providerId,
    name: "",
    description: "",
    category: "",
    city: "",
    condition: "",
    price_hour: "",
    price_day: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct(form);
    alert(`Product added! ID: ${res.id}`);
    setForm({ ...form, name: "", description: "", category: "", city: "", condition: "", price_hour: "", price_day: "" });
  };

  return (
    <div className="max-w-md border p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold mb-3">Add Product</h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 rounded" required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded" required />
        <input name="condition" placeholder="Condition" value={form.condition} onChange={handleChange} className="border p-2 rounded" required />
        <input name="price_hour" type="number" placeholder="Price per Hour" value={form.price_hour} onChange={handleChange} className="border p-2 rounded" required />
        <input name="price_day" type="number" placeholder="Price per Day" value={form.price_day} onChange={handleChange} className="border p-2 rounded" required />
        <button className="bg-blue-500 text-white p-2 rounded mt-2">Add Product</button>
      </form>
    </div>
  );
}