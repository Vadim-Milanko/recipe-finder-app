import { FETCH_URLS, QUERIES } from '@/app/constants/fetchUrls';
import { Recipe } from '@/app/interfaces/recipe';
import RecipeCard from '@/app/recipes/components/RecipeCard/RecipeCard';

const API_KEY = process.env.API_KEY;

interface UrlParams {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}

async function getRecipes(searchParams: UrlParams) {
  const { query, cuisine, maxReadyTime } = searchParams;

  if (!API_KEY) throw new Error('API key is missing. Please check your environment variables.');

  const url = new URL(`${FETCH_URLS.BASE_URL}${FETCH_URLS.COMPLEX_SEARCH}`);

  url.searchParams.append(QUERIES.API_KEY, API_KEY);

  if (query) url.searchParams.append(QUERIES.QUERY, query);
  if (cuisine) url.searchParams.append(QUERIES.CUISINE, cuisine);
  if (maxReadyTime) url.searchParams.append(QUERIES.MAX_READY_TIME, maxReadyTime);

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!response.ok) throw new Error('Failed to fetch recipes.');

  const data = await response.json();

  return data.results || [];
}

export default async function RecipesPage({ searchParams }: { searchParams: UrlParams }) {
  try {
    const recipes: Recipe[] = await getRecipes(searchParams);

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Recipes</h1>

        {recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <p className="text-red-500 text-center mt-10">Failed to load recipes. Please try again later.</p>;
  }
}
