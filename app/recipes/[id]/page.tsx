import { Suspense } from 'react';

import { Loading } from '@/app/recipes/[id]/components/Loading/Loading';
import { RecipeDetails } from '@/app/recipes/[id]/components/RecipeDetails/RecipeDetails';

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <RecipeDetails id={params.id} />
    </Suspense>
  );
}
