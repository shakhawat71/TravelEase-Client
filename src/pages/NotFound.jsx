import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-3">404 - Not Found</h1>
      <Link className="text-blue-600 underline" to="/">
        Go Home
      </Link>
    </div>
  );
}
