// import MicroModal from "micromodal"


export function get_data_entries(e: SubmitEvent) {
    return Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries())
}
