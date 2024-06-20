document.addEventListener('DOMContentLoaded', () => {
    
    // 1º: Inicializamos el apiUrl, la currentPage, y referenciamos los elementos DOM necesarios.
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    let currentPage = 1;

    const characterList = document.getElementById('character-list');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // 2º: fetchCharacters(page): Esta función realiza una solicitud a la API para obtener los personajes de la página.
    async function fetchCharacters(page) {
        try {
            const response = await fetch(`${apiUrl}?page=${page}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }

    // 3º: updateCharacterList(characters): Con esta función actualiza el DOM con los personajes recibidos de la API. Creamos también los elementos li para cada personaje y los añadimos a la lista.
    function updateCharacterList(characters) {
        characterList.innerHTML = '';
        characters.forEach(character => {
            const li = document.createElement('li');
            li.className = 'character-card';

            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;

            const info = document.createElement('div');
            info.className = 'character-info';

            const name = document.createElement('h2');
            name.innerHTML = `<span class="label">Name:</span> ${character.name}`;

            const species = document.createElement('p');
            species.innerHTML = `<span class="label">Species:</span> ${character.species}`;

            info.appendChild(name);
            info.appendChild(species);
            li.appendChild(img);
            li.appendChild(info);
            characterList.appendChild(li);
        });
    }

    // 4º: loadPage(page): Esta función carga los personajes de la página y actualiza los botones de página siguiente o anterior.
    async function loadPage(page) {
        const data = await fetchCharacters(page);
        updateCharacterList(data.results);
        prevButton.disabled = !data.info.prev;
        nextButton.disabled = !data.info.next;
    }

    // 5º: Event Listeners: Aquí creamos los botones de paginación para pasar una páginas más o unan anterior.
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadPage(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPage++;
        loadPage(currentPage);
    });

    // 6: Carga inicial: Se carga la primera página de personajes al cargar la página. Si no lo ponemos no se carga.
    loadPage(currentPage);
});


//CODIGO DE DATA

// 1 - traerme con fetch los datos de la API -- CHECK!
// 2 -capturar el espacio en el html para poder poner los personajes -- CHECK!
// 3 - crear un html dentro con un bucle para traerme los 20 personajes -- CHECK!
// 4 - poner las css para que estén uno al lado del otro  -- CHECK!

//hacer que los botones funcionen

// const listChgaracterUL = document.getElementById("character-list")
// const prevBtn = document.getElementById("prev-page")
// const nextBtn = document.getElementById("next-page") 

// let page = 1

// const getCharacter = () => {
//   listChgaracterUL.innerHTML = ""
//   if(page === 1) {
//     prevBtn.disabled = true
//     prevBtn.classList.add("disabled")
//   } else {
//     prevBtn.disabled = false
//     prevBtn.classList.remove("disabled")

//   }
//   fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)  
//     .then(response => response.json())
//     .then(data => {
//       const characters = data.results
//       characters.forEach(character => {
//         const template = `
//           <li>
//             <img src=${character.image} alt=${character.name} />
//             <h2><span>Nombre:</span>${character.name}</h2>
//             <p><span>Especie:</span>${character.species}</p>
//           </li>
//         `
//         listChgaracterUL.innerHTML += template
//       });
//     })
// }

// getCharacter()


// const changePage = (clickValue) => {
//   clickValue
//   getCharacter()
// }

// nextBtn.addEventListener("click", () => 
//   {changePage(page++)
//     console.log(page)
//   }

// )
// prevBtn.addEventListener("click", () => {
//   changePage(page--)
//   console.log(page)

// })