// document.addEventListener("DOMContentLoaded", () => {
//   // Primero:  Inicializamos el apiUrl, la currentPage, y referenciamos los elementos DOM necesarios.
//   const apiUrl = "https://rickandmortyapi.com/api/character";
//   let currentPage = 1;

//   const characterList = document.getElementById("character-list");
//   const prevButton = document.getElementById("prev-page");
//   const nextButton = document.getElementById("next-page");

//   // Segundo :Con esta función realizamos una solicitud a la API para obtener los personajes de la página.
//   async function fetchCharacters(page) {
//     try {
//       const response = await fetch(`${apiUrl}?page=${page}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching characters:", error);
//     }
//   }

//   // Tercero: updateCharacterList(characters): Con esta función actualiza el DOM con los personajes recibidos de la API. Creamos también los elementos li para cada personaje y los añadimos a la lista.
//   function updateCharacterList(characters) {
//     characterList.innerHTML = "";
//     characters.forEach((character) => {
//       const li = document.createElement("li");
//       li.className = "character-card";

//       const img = document.createElement("img");
//       img.src = character.image;
//       img.alt = character.name;

//       const info = document.createElement("div");
//       info.className = "character-info";

//       const name = document.createElement("h2");
//       name.innerHTML = `<span class="label">Name:</span> ${character.name}`;

//       const species = document.createElement("p");
//       species.innerHTML = `<span class="label">Species:</span> ${character.species}`;

//       info.appendChild(name);
//       info.appendChild(species);
//       li.appendChild(img);
//       li.appendChild(info);
//       characterList.appendChild(li);
//     });
//   }

//   // Cuarto : loadPage(page): Esta función carga los personajes de la página y actualiza los botones de página siguiente o anterior.
//   async function loadPage(page) {
//     const data = await fetchCharacters(page);
//     updateCharacterList(data.results);
//     prevButton.disabled = !data.info.prev;
//     nextButton.disabled = !data.info.next;
//   }

//   // Quinto: Event Listeners: Aquí creamos los botones de paginación para pasar una páginas más o unan anterior.
//   prevButton.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       loadPage(currentPage);
//     }
//   });

//   nextButton.addEventListener("click", () => {
//     currentPage++;
//     loadPage(currentPage);
//   });

//   loadPage(currentPage);
// });

// fetch al end point para ver que tiene la API https://rickandmortyapi.com/api/character/?page=1 OK
// cojo el sitio donde poner los personajes --> id character-list OK
// crear un bucle para traer a los personales OK
// crear un template para poner los datos de los personajes OK
// poner las CSS OK

// cojo los botones para poder paginar --> id prev-page y id next-page OK
// que funcione todo OK

const characterList = document.getElementById("character-list");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");

let currentPage = 1;

const getCharacters = () => {
  characterList.innerHTML = "";
  if (currentPage === 1) {
    prevBtn.disabled = true;
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove("disabled");
  }
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
    .then((response) => response.json())
    .then((data) => {
      const characters = data.results;
      characters.forEach((character) => {
        const template = `
        <li>
         <img src=${character.image} alt=${character.name} />
         <h2><span>name:</span> ${character.name}</h2>
         <p><span>specie:</span> ${character.species}</p>
        </li>
        `;
        characterList.innerHTML += template;

        // const elemento = document.createElement("li")
        // elemento.innerHTML = `
        //   <img src=${character.image} alt=${character.name} />
        //   <h2>name: ${character.name}</h2>
        //   <p>specie: ${character.species}</p>
        // `
        // characterList.appendChild(elemento)
      });
    })

    .catch((err) => console.error(err));
};

getCharacters();

const changePage = (clickValue) => {
  clickValue;
  getCharacters();
};

nextBtn.addEventListener("click", () => changePage(currentPage++));
prevBtn.addEventListener("click", () => changePage(currentPage--));
