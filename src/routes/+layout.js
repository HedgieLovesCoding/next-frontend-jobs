import { checkLoggedIn } from "../utils/auth.js";
import { checkSearch } from "../utils/search.js";
import { checkTheme } from "../utils/theme.js";

export const ssr = false; // this essentially turns our entire project into true SPA mode. No JS code will execute server side.

export async function load() {
    await checkLoggedIn()
    await checkTheme()
    await checkSearch()
}