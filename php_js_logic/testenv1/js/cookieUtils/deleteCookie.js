import { setCookie } from "./setCookie.js";

function deleteCookie(name) {
    setCookie(name, '', -1);
}

export { deleteCookie };