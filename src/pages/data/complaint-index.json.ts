import type { APIRoute } from 'astro';
import { complaintIndex } from '../../data/complaint-index';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(complaintIndex, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
