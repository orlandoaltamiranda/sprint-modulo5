// HP API: https://hp-api.herokuapp.com/

const urlAPI2 = 'https://rickandmortyapi.com/api/character'

const personajes = []
let favoritos = []
let contenido = document.querySelector('#data')


// Traer datos API
function traerDatos() {
    fetch(urlAPI2) 
        .then(datosAPI => datosAPI.json()) // FORMATO QUE VAMOS A RECIBIR NUESTRA INFORMACIÓN
        .then(datosPersonajes => {
            for (let index = 0; index < 20; index++) {
                personajes.push(datosPersonajes.results[index]);
            }
            mostrar(personajes)
            
        })
        .catch (error => {
            console.log (error)
        })
}
traerDatos();

// Listar Personajes
function mostrar(personajes) {
    contenido.innerHTML = ''

    if (personajes.length == 0) {
        contenido.innerHTML +=`
            <h1 class="text-center">No tienes favoritos, agrega uno</h1>
        ` 
    } else {
        personajes.map(personaje => {
            contenido.innerHTML +=`
            <div class="card m-3 shadow" style="width: 18rem;">
            <img src="${personaje.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">Species: ${personaje.species}</a>
            <button onclick="addFavorites('${personaje.name}')" type="button" class="btn btn-outline-danger">
            <i class="fa-solid fa-heart"></i>
            </button>
            </div>
            <button onclick="detalle('${personaje.name}')" type="button" class="btn bg-success mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Más detalles
            </button>
            </div>`      
        });
    };
}

// Detalle de Personaje
let contenidoModal = document.getElementById ("detalle-personaje");

function detalle(name){
    let personaje = personajes.find(item => item.name === name);
    contenidoModal.innerHTML = '';
    contenidoModal.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4">
        <img src="${personaje.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">Name: ${personaje.name}</h5>
        <h6 class="card-title">Status: ${personaje.status}</h6>
        <h6 class="card-text">Origin: ${personaje.origin.name}</h6>
        <h6 class="card-text">Gender: ${personaje.gender}</h6>
        <h6 class="card-text">Location: ${personaje.location.name}</h6>
        <button onclick="addFavorites('${personaje.name}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add to favorites
        </button>
        </div>
        </div>
        </div>
        </div>
        `
}

// Añadir a favoritos
function addFavorites(name){
    let personaje = personajes.find(personaje => personaje.name === name);
    const repeat = favoritos.some(personaje=>personaje.name == name);

    if (repeat){
        console.log('Ya está en tus favoritos')
    }else{
        favoritos.push(personaje);
    }
}


// Buscar Personaje
function searchCharacter() {
    contenido.innerHTML = ""
    const busquedaUsuario = document.getElementById("basic-addon2").value;

        console.log();
        if ((!/^[a-zA-Z]*$/g.test(busquedaUsuario))) {
            alert("Solo admite letras")
            contenido.innerHTML = '<h1 class="text-center">No hay resultados</h1>'
        }else {
            const nombrePersonaje = busquedaUsuario.toLowerCase();

            const resultados = personajes.filter(personaje => {
                const resultado = personaje.name.toLowerCase();
                return resultado == "" ?  lista(productos) : resultado.includes(nombrePersonaje);
            })
            mostrar(resultados)
        }
}


//  Loading
setTimeout(function(){
    let loading = document.getElementById('loader-container');
    console.log(loading)
        loading.style.visibility = 'none';
        loading.style.opacity = '0';
   }, 2000);