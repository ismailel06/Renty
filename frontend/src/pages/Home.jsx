import { Link } from "react-router-dom";

export default function Home({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="no-underline">
          <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="font-bold text-xl mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="mb-1">
              <span className="font-semibold">Hour:</span> ${product.price_hour} |{" "}
              <span className="font-semibold">Day:</span> ${product.price_day}
            </p>
            <p className="text-sm text-gray-500">City: {product.city}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}