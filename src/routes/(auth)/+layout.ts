import type { LayoutLoad } from './$types';


function preload(src: string) {
    return new Promise(res => {
        let img = new Image()
        img.src = src
        img.onload = res
    })
}

export const load = (async () => {
    let bg_img_url = "https://picsum.photos/960/1080"
    await preload(bg_img_url)
    return {
        bg_img_url
    };
}) satisfies LayoutLoad;