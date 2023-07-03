import type { PageLoad } from './$types';

export const load = (async ({params}) => {
    return {
        req_user_id: params.user
    };
}) satisfies PageLoad;