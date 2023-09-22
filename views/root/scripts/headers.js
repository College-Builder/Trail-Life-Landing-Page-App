(() => {
    const menu = window.document.querySelector("div[mobile-header-menu]")
    const button = window.document.querySelector("button[mobile-header-menu-button]")
    let active = false

    button.addEventListener("click", () => {
        menu.style.height = active ? `${menu.scrollHeight}px` : "0px"

        active = !active
    })
})()