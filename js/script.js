/* =========================================================
   CAMBIO DE IDIOMA
   ========================================================= */

function setLanguage(language, savePreference = false) {

    if (!translations[language]) {
        language = "es";
    }

    const t = translations[language];

    document.documentElement.lang = language;
    document.title = t.title;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (t[key] !== undefined) {
            element.innerHTML = t[key];
        }

    });

    // Guardar solamente cuando el usuario
    // eligió manualmente el idioma
    if (savePreference) {
        localStorage.setItem("orejiblanco-language", language);
    }

    // Actualizar botones ES / EN
    document.querySelectorAll("[data-language]").forEach(button => {

        button.classList.toggle(
            "active",
            button.getAttribute("data-language") === language
        );

    });
}


/* =========================================================
   DETECTAR IDIOMA DEL DISPOSITIVO / NAVEGADOR
   ========================================================= */

function detectLanguage() {

    // Si el usuario eligió manualmente un idioma anteriormente,
    // respetamos esa elección.
    const savedLanguage =
        localStorage.getItem("orejiblanco-language");

    if (
        savedLanguage &&
        translations[savedLanguage]
    ) {
        return savedLanguage;
    }

    // Idiomas preferidos del navegador
    const browserLanguages =
        navigator.languages ||
        [navigator.language] ||
        ["es"];

    // Buscar inglés entre los idiomas configurados
    const hasEnglish = browserLanguages.some(language =>
        language.toLowerCase().startsWith("en")
    );

    if (hasEnglish) {
        return "en";
    }

    // Para español, portugués, francés, alemán, etc.,
    // dejamos español como idioma predeterminado.
    return "es";
}


/* =========================================================
   INICIAR
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Detectar idioma automáticamente
    // SIN guardarlo en localStorage
    const detectedLanguage = detectLanguage();

    setLanguage(detectedLanguage, false);


    // Botones ES / EN
    document.querySelectorAll("[data-language]").forEach(button => {

        button.addEventListener("click", () => {

            const language =
                button.getAttribute("data-language");

            // La elección manual sí queda guardada
            setLanguage(language, true);

        });

    });

});
