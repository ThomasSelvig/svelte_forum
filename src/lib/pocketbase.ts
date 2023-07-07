import PocketBase from "pocketbase"
import { writable } from "svelte/store"

import { PUBLIC_PB_HOST } from "$env/static/public"

import type { Record } from "pocketbase";


// default: expand=single (only one Record)
// if expand is of type multiple, use ExpandRecord<Record[]> to get expand=array of Records
export interface ExpandRecord<T = Record> extends Omit<Record, "expand"> {
    expand: {[some_expand: string]: T}
}

export const pb = new PocketBase(PUBLIC_PB_HOST)
// pb.autoCancellation(false)
export const user = writable(pb.authStore.model, function (set) {  
    pb.authStore.onChange((token, model) => {  
        set(model)
        // TODO maybe stpre `token` to cookie
    }, true)
})
