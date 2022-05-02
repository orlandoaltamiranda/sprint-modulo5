// HP API: https://hp-api.herokuapp.com/

const urlAPI2 = 'https://jsonplaceholder.typicode.com/posts'

const personajes = []
let favoritos = []
let contenido = document.querySelector('#data')


//Cargando de manera asíncrona Datos API
const traerDatos = async () => {
    try {
      const respuesta = await fetch(urlAPI2)
      const datosRM = await respuesta.json()
      const listaPersonajes = datosRM
      console.log(listaPersonajes)
      for (let index = 0; index < 20; index++) {
        personajes.push(listaPersonajes[index]);
    }
    mostrar(personajes)
    
    } catch (error) {
      console.log(error.message)
    }
  }
traerDatos()

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
            <img src="./img/pngaaa.com-2998297.png" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${personaje.id}</h5>
            <p class="card-text">Title: ${personaje.title}</a>
            <button onclick="addFavorites('${personaje.id}')" type="button" class="btn btn-outline-danger">
            <i class="fa-solid fa-heart"></i>
            </button>

            </div>
            <button onclick="traerDatosDetalles('${personaje.id}')" type="button" class="btn bg-success mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Más detalles
            </button>
            </div>`       
            });
    };
}


//Cargando de manera asíncrona Datos API
const traerDatosDetalles = async (id) => {
    const urlApiId = `https://jsonplaceholder.typicode.com/posts/${id}`
    try {
      const respuesta = await fetch(urlApiId)
      const datosRM = await respuesta.json()
      const detallePersonaje = datosRM 
      
      let contenidoModal = document.getElementById ("detalle-personaje");

      contenidoModal.innerHTML = '';
      contenidoModal.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
          <div class="col-md-4">
          <img src="https://i.pinimg.com/550x/93/93/82/939382a22dc96f1d224614978b3c3e70.jpg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">ID: ${detallePersonaje.id}</h5>
          <h6 class="card-title">Title: ${detallePersonaje.title}</h6>
          <h6 class="card-text">Body: ${detallePersonaje.body}</h6>
          <button onclick="addFavorites('${detallePersonaje.id}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add to favorites
          </button>
          </div>
          </div>
          </div>
          </div>
          `
    } catch (error) {
      console.log(error.message)
    }
  }

let contenidoModal = document.getElementById ("detalle-personaje");

function detalle(name){
    let personaje = personajes.find(item => item.id == name);
    contenidoModal.innerHTML = '';
    contenidoModal.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4">
        <img src="" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">ID: ${personaje.id}</h5>
        <h6 class="card-title">Title: ${personaje.title}</h6>
        <h6 class="card-text">Body: ${personaje.body}</h6>
        <button onclick="addFavorites('${personaje.id}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
    let personaje = personajes.find(personaje => personaje.id == name);
    const repeat = favoritos.some(personaje=>personaje.id == name);

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

        console.log(personajes);
        if ((!/^[a-zA-Z]*$/g.test(busquedaUsuario))) {
            alert("Solo admite letras")
            contenido.innerHTML = '<h1 class="text-center">No hay resultados</h1>'
        }else {
            const nombrePersonaje = busquedaUsuario.toLowerCase();

            const resultados = personajes.filter(personaje => {
                const resultado = personaje.title.toLowerCase();
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