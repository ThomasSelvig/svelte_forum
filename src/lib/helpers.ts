import type { IsoDateString } from "$lib/pocketbase-types";


export function get_data_entries(e: SubmitEvent) {
    return Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries())
}

export const calc_time_diff = (date: IsoDateString) => {
    const diff_mins = Math.floor((Date.now() - (new Date(date)).getTime()) / 1000 / 60);
    const hours = Math.floor(diff_mins / 60);
    const days = Math.floor(hours / 24);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (days > 0) {
        return rtf.format(-days, 'day');
    } else if (hours > 0) {
        return rtf.format(-hours, 'hour');
    } else {
        return rtf.format(-diff_mins, 'minute');
    }
}

