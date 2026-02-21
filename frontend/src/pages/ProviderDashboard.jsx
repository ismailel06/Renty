import AddProduct from "./AddProduct";

export default function ProviderDashboard({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Provider Dashboard</h2>
      <AddProduct providerId={user.id} />
      {/* Later we will show rental requests and product list */}
    </div>
  );
}