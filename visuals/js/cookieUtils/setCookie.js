function setCookie(name, value, HoursToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (HoursToLive * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export { setCookie };