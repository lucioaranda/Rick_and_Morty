const container = document.getElementById('characterContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let allCharacters = [];
let currentPage = 1;
const charactersPerPage = 40;

async function obtenerTodosLosPersonajes() {
  let url = 'https://rickandmortyapi.com/api/character';
  let personajes = [];


  while (url) {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    personajes = personajes.concat(datos.results);
    url = datos.info.next;
  }

  return personajes;
}

function mostrarPagina(pagina) {
  container.innerHTML = ''; 

  const start = (pagina - 1) * charactersPerPage;
  const end = start + charactersPerPage;
  const personajesPagina = allCharacters.slice(start, end);

  personajesPagina.forEach(personaje => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">
      <h2>${personaje.name}</h2>
      <p><strong>Especie:</strong> ${personaje.species}</p>
      <p><strong>Estado:</strong> ${personaje.status}</p>
    `;

    container.appendChild(card);
  });

  pageInfo.textContent = `Página ${pagina} de ${Math.ceil(allCharacters.length / charactersPerPage)}`;

  prevBtn.disabled = pagina === 1;
  nextBtn.disabled = pagina === Math.ceil(allCharacters.length / charactersPerPage);
}

async function iniciar() {
  allCharacters = await obtenerTodosLosPersonajes();
  mostrarPagina(currentPage);
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    mostrarPagina(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(allCharacters.length / charactersPerPage)) {
    currentPage++;
    mostrarPagina(currentPage);
  }
});

iniciar();
