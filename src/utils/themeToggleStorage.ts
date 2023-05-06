
const getCurrentThemeMode = ()=> JSON.parse(localStorage.getItem("theme-mode") || "true")
const persistCurrentThemeMode = (themeModeBoolVal: boolean) => {
    localStorage.setItem("theme-mode", JSON.stringify(themeModeBoolVal));
}
export {
    getCurrentThemeMode,
    persistCurrentThemeMode
}