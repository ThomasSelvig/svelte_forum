import PocketBase from "pocketbase"
import { writable } from "svelte/store"

import { PUBLIC_PB_HOST } from "$env/static/public"


export const pb = new PocketBase(PUBLIC_PB_HOST)
export const user = writable(pb.authStore.model, function (set) {  
    pb.authStore.onChange((token, model) => {  
        set(model)
        // TODO maybe stpre `token` to cookie
    }, true)
})
