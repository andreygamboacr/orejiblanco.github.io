function setLanguage(language, savePreference = false) {

    if (!translations[language]) {
        language = "es";
    }

    const t = translations[language];

    document.documentElement.lang = language;
    document.title = t.title;


    // =====================================================
    // TRADUCIR TEXTOS
    // =====================================================

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (t[key] !== undefined) {
            element.innerHTML = t[key];
        }

    });


    // =====================================================
    // TRADUCIR TEXTOS ALTERNATIVOS DE IMÁGENES
    // =====================================================

    document.querySelectorAll("[data-i18n-alt]").forEach(element => {

        const key = element.getAttribute("data-i18n-alt");

        if (t[key] !== undefined) {
            element.setAttribute("alt", t[key]);
        }

    });


    // =====================================================
    // GUARDAR PREFERENCIA MANUAL
    // =====================================================

    if (savePreference) {
        localStorage.setItem("orejiblanco-language", language);
    }


    // =====================================================
    // ACTUALIZAR BOTONES ES / EN
    // =====================================================

    document.querySelectorAll("[data-language]").forEach(button => {

        button.classList.toggle(
            "active",
            button.getAttribute("data-language") === language
        );

    });

}
