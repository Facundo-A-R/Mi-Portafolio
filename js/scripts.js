// Constantes modo oscuro y claro por id.
const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

// Constantes 4 colores por id.
const toggleColors = document.getElementById('toggle-colors');

/*
 * Al acceder a document.documentElement.style, estás apuntando a las propiedades 
 * de estilo del elemento raíz. 
 * Esto es útil para cambiar dinámicamente las variables CSS en tu aplicación web.
*/
const rootStyle = document.documentElement.style;

// Bandera
const flagsElement = document.getElementById('flags');

// Localizar las secciones que contienen texto que vamos a modificar por medio de los data
const textsToChange = document.querySelectorAll('[data-section]')

// Modo oscuro y claro.
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
    if (toggleIcon.src.includes('moon.svg')) {
        toggleIcon.src = 'assets/icons/sun.svg';
        toggleText.textContent = 'Light Mode';
    } else {
        toggleIcon.src = 'assets/icons/moon.svg';
        toggleText.textContent = 'Dark Mode';
    }
});

// Cambio de colores.
toggleColors.addEventListener("click", (e) => {
    //console.log(e.target.dataset);
    rootStyle.setProperty("--primary-color", e.target.dataset.color);
});

// Funcion para leer json
const changeLenguage = async (lenguage) =>{
    const requestJson = await fetch(`./lenguages/${lenguage}.json`);
    const texts = await requestJson.json();

    //console.log(texts);

    for (const textToChange of textsToChange) {
        //console.log(textsToChange);
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        //console.log(section, value);
        textToChange.innerHTML = texts[section][value];
    }
};

// Bandera Lenguage
flagsElement.addEventListener("click", (e) => {
    //console.log(e.target.parentElement.dataset.lenguage);
    changeLenguage(e.target.parentElement.dataset.lenguage);
});

