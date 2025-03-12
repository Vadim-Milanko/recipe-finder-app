import { ROUTES } from '@/app/constants/routes';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <p className="text-xl text-gray-600 mt-4">Page not found</p>

      <a
        href={ROUTES.HOME}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
