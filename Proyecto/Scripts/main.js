const container = document.getElementById('characterContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');
const speciesContainer = document.getElementById('speciesContainer');

let allCharacters = [];
let filteredCharacters = [];
let currentPage = 1;
const charactersPerPage = 40;
let activeSpecies = '';

const speciesList = [
  "Human", "Alien", "Humanoid", "unknown", "Poopybutthole",
  "Mythological Creature", "Animal", "Robot", "Cronenberg", "Disease"
];


function generarBotonesEspecies() {
  speciesContainer.innerHTML = '';

  const btnTodos = document.createElement('button');
  btnTodos.textContent = 'Todos';
  btnTodos.classList.add('species-btn', 'active'); 
  btnTodos.addEventListener('click', () => {
    activeSpecies = ''; 
    document.querySelectorAll('.species-btn').forEach(b => b.classList.remove('active'));
    btnTodos.classList.add('active');
    aplicarFiltros();
  });
  speciesContainer.appendChild(btnTodos);

  
  speciesList.forEach(species => {
    const btn = document.createElement('button');
    btn.textContent = species;
    btn.classList.add('species-btn');
    btn.addEventListener('click', () => {
      activeSpecies = activeSpecies === species ? '' : species;
      document.querySelectorAll('.species-btn').forEach(b => b.classList.remove('active'));
      if (activeSpecies) btn.classList.add('active');
      else btnTodos.classList.add('active'); 
      aplicarFiltros();
    });
    speciesContainer.appendChild(btn);
  });
}

function aplicarFiltros() {
  const query = searchInput.value.toLowerCase();
  filteredCharacters = allCharacters.filter(personaje => {
    const coincideNombre = personaje.name.toLowerCase().includes(query);
    const coincideEspecie = activeSpecies === '' || personaje.species === activeSpecies;
    return coincideNombre && coincideEspecie;
  });
  currentPage = 1;
  mostrarPagina(currentPage, filteredCharacters);
}

function mostrarPagina(pagina, personajesArray = allCharacters) {
  container.innerHTML = '';
  const totalPages = Math.ceil(personajesArray.length / charactersPerPage);
  const start = (pagina - 1) * charactersPerPage;
  const end = start + charactersPerPage;
  const personajesPagina = personajesArray.slice(start, end);

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

  pageInfo.textContent = `Página ${pagina} de ${totalPages}`;
  prevBtn.disabled = pagina === 1;
  nextBtn.disabled = pagina === totalPages;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const personajesArray = filteredCharacters.length ? filteredCharacters : allCharacters;
    mostrarPagina(currentPage, personajesArray);
  }
});

nextBtn.addEventListener('click', () => {
  const personajesArray = filteredCharacters.length ? filteredCharacters : allCharacters;
  if (currentPage < Math.ceil(personajesArray.length / charactersPerPage)) {
    currentPage++;
    mostrarPagina(currentPage, personajesArray);
  }
});

searchInput.addEventListener('input', aplicarFiltros);

async function iniciar() {
  allCharacters = await obtenerTodosLosPersonajes();
  filteredCharacters = [];
  generarBotonesEspecies();
  mostrarPagina(currentPage);
}

iniciar();

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
