import Image from 'next/image';

import { FETCH_URLS, QUERIES } from '@/app/constants/fetchUrls';

const API_KEY = process.env.API_KEY;

async function getRecipeDetails(id: string) {
  if (!API_KEY) throw new Error('API key is missing. Please check your environment variables.');

  const url = `${FETCH_URLS.BASE_URL}/${id}${FETCH_URLS.INFORMATION}?${QUERIES.API_KEY}=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error('Failed to fetch recipe details.');

  return response.json();
}

export async function RecipeDetails({ id }: { id: string }) {
  const recipe = await getRecipeDetails(id);

  console.log(recipe);

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <h1 className="text-3xl font-bold text-black text-center mb-4">{recipe.title}</h1>

      <Image
        className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
        src={recipe.image}
        alt={recipe.title}
        width={500}
        height={400}
        priority
      />

      <h2 className="text-2xl font-semibold text-black mt-6">Ingredients</h2>

      <ul className="list-disc pl-6 mt-2 text-black">
        {recipe.extendedIngredients.map((ingredient: { id: number; original: string }) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold text-black mt-6">Summary</h2>

      <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
    </div>
  );
}
