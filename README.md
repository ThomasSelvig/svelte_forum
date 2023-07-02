## TODO

### general todo
- use built in svelte animations
- use pocketbase subscribe to collection to update posts
- replace "Category -> Forum" with proper breadcrumbs
- implement pagination wherever i use .getList

## what i've learned
- TS may be overkill and some prefer JSDoc over all else: maybe replace TS with JSDoc next project
- if using TS, use pocketbase-typegen on npm
- svelte syntax like "{#each}" works terribly with TS because svelte-check doesn't support it
    - some places in the code i had to resort to `ProperType | any` just so i could use a var that definitely was PoperType in the HTML (no TS in svelte html)
    - some places i (because of svelte-check not supporting TS) use `any` instead of undefined
    - in general TS works for everything except may-be-undefined values, so all expands have to be either `any` or first check that they aren't null with `{#if model.expand} {model.expand.some_coll.some_expand_val_that_now_has_proper_type} {/if}`
- **very explicit typing (remember)** (cast from Record[] to PostsResponse[]): `r.items as unknown as PostsResponse[]`
- the importance of `flex-basis` (can make equal columns, i.e.)
- sveltekit:
    - you can preload anything in +page|layout.ts and the load() will preload when you hover links with data-sveltekit-preload-data="hover" prop. this includes images, which are cached by sveltekit, so preload by 
    ```ts
    function preload(src: string) {
        return new Promise(res => {
            let img = new Image()
            img.onload = res
            img.src = src
        })
    }

    export const load = (async () => {
        let bg_img_url = "https://picsum.photos/960/1080"
        preload(bg_img_url)
        return {
            bg_img_url
        };
    }) satisfies LayoutLoad;
    ```
    - you can preload every page by `export const prerender = true` in root +layout.ts
    - can also deploy as many prerendered pages as possible as static site with https://github.com/sveltejs/kit/tree/master/packages/adapter-static
    - loading data in `load()` is important, for one because it caches: https://kit.svelte.dev/docs/load#rerunning-load-functions
    - data exported from `load()` cannot be promises. i.e. you cannot export a promise and then {#await} it. `load()` will always resolve your promises and is designed to load data before .svelte. you cannot, in other words, preload a {#await} expecting it to cancel if you click the page before preload finished.

## useful

[svelte with TS examples by category](https://github.com/ivanhofer/sveltekit-typescript-showcase#svelte)
