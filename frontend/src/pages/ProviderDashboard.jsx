import { useEffect, useState } from "react";
import { getProviderRentals, acceptRental } from "../api/api";
import AddProduct from "./AddProduct";

export default function ProviderDashboard({ user }) {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    getProviderRentals(user.id).then(setRentals);
  }, [user.id]);

  const handleAccept = async (rentalId) => {
    await acceptRental(rentalId);
    setRentals(rentals.map(r => r.id === rentalId ? { ...r, status: 'accepted' } : r));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Provider Dashboard</h2>

      <AddProduct providerId={user.id} />

      <h3 className="text-xl font-bold mt-6 mb-2">Rental Requests</h3>
      {rentals.length === 0 && <p>No requests yet</p>}

      {rentals.map(r => (
        <div key={r.id} className="border p-3 rounded mb-2 flex justify-between items-center">
          <div>
            <p><span className="font-semibold">{r.client_name}</span> requested <span className="font-semibold">{r.product_name}</span> for {r.duration_hours} hours</p>
            <p>Status: {r.status}</p>
          </div>
          {r.status === 'requested' && (
            <button onClick={() => handleAccept(r.id)} className="bg-green-500 text-white p-2 rounded">
              Accept
            </button>
          )}
        </div>
      ))}
    </div>
  );
}