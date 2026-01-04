import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <h1 className="text-3xl">this is admin layout</h1>
      <Outlet />
    </div>
  );
}
