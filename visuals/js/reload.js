import { deleteCookie } from "./cookieUtils/deleteCookie.js";

function reloadAndDisable() {
    deleteCookie('captureChance');
    deleteCookie('currentHP');
    deleteCookie('maxHP');
    document.querySelector('#body').insertAdjacentHTML('afterend', '<div style="width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;"></div>');
    setTimeout(() => { window.location.reload(); }, 3500);
    
}

export { reloadAndDisable };