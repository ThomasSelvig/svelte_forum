import PocketBase from "pocketbase"
import { writable } from "svelte/store"

import { PUBLIC_PB_HOST } from "$env/static/public"

import type { Record } from "pocketbase";


export interface ExpandRecordSingle extends Omit<Record, "expand"> {
    expand: {[some_expand:string]: Record}
}
export interface ExpandRecord extends Omit<Record, "expand"> {
    expand: {[some_expand:string]: Record[]}
}

export const pb = new PocketBase(PUBLIC_PB_HOST)
export const user = writable(pb.authStore.model, function (set) {  
    pb.authStore.onChange((token, model) => {  
        set(model)
        // TODO maybe stpre `token` to cookie
    }, true)
})
