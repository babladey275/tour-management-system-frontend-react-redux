import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-md w-full bg-muted/40 rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">🚫</div>

        <h1 className="text-2xl font-bold text-muted-foreground mb-2">
          Access Denied
        </h1>

        <p className="text-muted-foreground mb-6">
          You don’t have permission to view this page. Please return to a safe
          place.
        </p>

        <Link
          to="/"
          className="inline-block rounded-lg bg-red-500 px-6 py-2.5 text-white font-medium hover:bg-red-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
