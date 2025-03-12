'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { CUISINES } from '@/app/constants/cuisine';
import { ROUTES } from '@/app/constants/routes';
import { QUERIES } from '@/app/constants/fetchUrls';

export default function SearchForm() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const isButtonDisabled = !query && !cuisine && !maxTime;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isButtonDisabled) return;

    const params = new URLSearchParams();
    if (query) params.append(QUERIES.QUERY, query);
    if (cuisine) params.append(QUERIES.CUISINE, cuisine);
    if (maxTime) params.append(QUERIES.MAX_READY_TIME, maxTime);

    router.push(`${ROUTES.RECIPES}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white shadow-xl rounded-2xl max-w-lg mx-auto border border-gray-200"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Find a Recipe</h2>

      <div className="mb-5">
        <label className="block text-lg font-semibold mb-2 text-gray-700">Search Query:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim())}
          placeholder="e.g. Pasta"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm transition"
        />
      </div>

      <div className="mb-5">
        <label className="block text-lg font-semibold mb-2 text-gray-700">Cuisine:</label>

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm transition bg-white"
        >
          <option value="">Select a cuisine</option>

          {CUISINES.map((cuisine) => (
            <option key={cuisine} value={cuisine} className="text-gray-900">
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-lg font-semibold mb-2 text-gray-700">Max Preparation Time (min):</label>

        <input
          type="number"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          min="1"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm transition"
        />
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`w-full py-3 font-semibold rounded-lg transition text-lg ${
          isButtonDisabled
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
        }`}
      >
        Next
      </button>
    </form>
  );
}
