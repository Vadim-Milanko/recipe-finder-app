import Link from 'next/link';
import Image from 'next/image';

import { ROUTES } from '@/app/constants/routes';
import { Recipe } from '@/app/interfaces/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard(props: RecipeCardProps) {
  const {
    recipe: { id, image, title },
  } = props;

  return (
    <Link
      href={`${ROUTES.RECIPES}/${id}`}
      className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
    >
      <h2 className="text-xl font-semibold text-black mt-2">{title}</h2>

      <Image src={image} alt={title} width={400} height={300} priority />
    </Link>
  );
}
