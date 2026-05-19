import type { APIRoute } from 'astro';
import { espressoSetupMatrix } from '../../data/espresso-setup-matrix';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(espressoSetupMatrix, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
