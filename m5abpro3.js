// HP API: https://hp-api.herokuapp.com/

const urlAPI = "abpro4.json"; // Traemos datos desde JSON Local
console.log(urlAPI);

const personajes = []
let favoritos = []
let contenido = document.querySelector('#data')

// Traer datos API
function traerDatos() {
    fetch(urlAPI) 
        .then(datosAPI => datosAPI.json()) // FORMATO QUE VAMOS A RECIBIR NUESTRA INFORMACIÓN
        .then(datosPersonajes => {
            for (let index = 0; index < 5; index++) {
                personajes.push(datosPersonajes[index]);
            }
            console.log(personajes);
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
            <img src="https://image.pngaaa.com/823/1843823-middle.png" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${personaje.id}</h5>
            <p class="card-text">Title: ${personaje.title}</p>
            <p> ${personaje.body} </p>           
            </div>
            <button onclick="detalle('${personaje.id}')" type="button" class="btn bg-warning mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Más detalles
            </button>
            </div>`      
        });
    };
}

// Detalle de Personaje
let contenidoModal = document.getElementById ("detalle-personaje");

function detalle(id){
   
    let personaje = personajes.find(item => item.id == id);   
    contenidoModal.innerHTML = '';
    contenidoModal.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4">
        <img src="https://image.pngaaa.com/823/1843823-middle.png" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">Usuario: ${personaje.id}</h5>
        <h6 class="card-title">Post: ${personaje.title}</h6>
        <h6 class="card-text">Contenido: ${personaje.body}</h6>        
        </div>
        </div>
        </div>
        </div>
        `
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
        loading.style.visibility = 'hidden';
        loading.style.opacity = '0';
   }, 2000);