# TODO
- use built in svelte animations
- use pocketbase subscribe to collection to update posts
- replace "Category -> Forum" with proper breadcrumbs
- implement pagination wherever i use .getList

- show real ratings
- make all `pb` data load calls in load() with preload=hover for links
- "write post" and "write comment" buttons

## what i've learned
- TS may be overkill and some prefer JSDoc over all else: maybe replace TS with JSDoc next project
- if using TS, use pocketbase-typegen on npm
- svelte syntax like "{#each}" works terribly with TS because svelte-check doesn't support it
    - some places in the code i had to resort to `ProperType | any` just so i could use a var that definitely was PoperType in the HTML (no TS in svelte html)
    - some places i (because of svelte-check not supporting TS) use `any` instead of undefined
    - in general TS works for everything except may-be-undefined values, so all expands have to be either `any` or first check that they aren't null with `{#if model.expand} {model.expand.some_coll.some_expand_val_that_now_has_proper_type} {/if}`
- very explicit typing (cast from Record[] to PostsResponse[]): `r.items as unknown as PostsResponse[]`
