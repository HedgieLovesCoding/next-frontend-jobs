import { writable } from "svelte/store";

function createSearchBarStore() {
    const defaultValue = { placeHolder: 'Search', content: '' }
    const { subscribe, set } = writable(defaultValue)

    return {
        subscribe,
        set: (val) => set({ placeHolder: 'Search', content: val }),
        clear: () => set(defaultValue)
    }
}

export const currentSearch = createSearchBarStore()

export async function checkSearch() {
    const getSearchLocalStorage = localStorage.getItem("searchContent") || ''

    if (getSearchLocalStorage != '') {
        currentSearch.set(getSearchLocalStorage)
    } else {
        localStorage.setItem("searchContent", '')
        currentSearch.clear()
    }
}