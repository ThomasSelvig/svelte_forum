export const ssr = false;
// export const prerender = true;

import type { LayoutLoad } from './$types';

export const load = (async ({url}) => {
    return {
        path: url.pathname
    };
}) satisfies LayoutLoad;