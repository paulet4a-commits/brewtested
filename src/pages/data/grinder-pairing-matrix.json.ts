import type { APIRoute } from 'astro';
import { grinderPairingMatrix } from '../../data/grinder-pairing-matrix';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(grinderPairingMatrix, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
