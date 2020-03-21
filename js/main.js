const http = require('http');
const fs = require('fs');
const path= require('path');

http.createServer((req,res)=>){

	console.log(`${req.method} solicita ${req.url}`);

    if(req.url == '/'){
        fs.readFile('./App/index.html', 'UTF-8', (err, html) =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    }else if(req.url.match(/.css$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }else if(req.url.match(/.jpg$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath);

        res.writeHead(200, {'Content-Type': 'image/jpg'});
        fileStream.pipe(res);
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 ERROR');
    }

}).listen(3000);

console.log('Servidor iniciado...');

(function(){
	// Variables
	var lista = document.getElementById("lista"),
		tareaInput = document.getElementById("tareaInput"),
		btnNuevaTarea = document.getElementById("btn-agregar");

	// Funciones
	var agregarTarea = function(){
		var tarea = tareaInput.value,
			nuevaTarea = document.createElement("li"),//mete el elemento a al li
			enlace = document.createElement("a"), //mete el elemento a
			contenido = document.createTextNode(tarea);

		if (tarea === "") {
			tareaInput.setAttribute("placeholder", "Agrega una tarea valida");
			tareaInput.className = "error";
			return false;
		}

		// Agregamos el contenido al enlace
		enlace.appendChild(contenido);
		// Le establecemos un atributo href, para que sea clickeable
		enlace.setAttribute("href", "#");
		// Agrergamos el enlace (a) a la nueva tarea (li)
		nuevaTarea.appendChild(enlace);
		// Agregamos la nueva tarea a la lista
		lista.appendChild(nuevaTarea);

		tareaInput.value = "";//para que se limpie el contenido

		for (var i = 0; i <= lista.children.length -1; i++) { //numero de elementos li
			lista.children[i].addEventListener("click", function(){ //acceder a cada uno
				this.parentNode.removeChild(this);//this es para eliminarlo, el elmento actual trabajado
			});
		}

	};
	var comprobarInput = function(){//elimine la clase y reestablesca
		tareaInput.className = "";
		teareaInput.setAttribute("placeholder", "Agrega tu tarea");
	};

	var eleminarTarea = function(){//
		this.parentNode.removeChild(this);//que elimine el elemnto ese elemento de acuerdo al ciclo
	};

	// Eventos
	// Agregar Tarea
	btnNuevaTarea.addEventListener("click", agregarTarea);

	// Comprobar Input
	tareaInput.addEventListener("click", comprobarInput);

	// Borrando Elementos de la lista
	for (var i = 0; i <= lista.children.length -1; i++) {//se va a eliminar la clickeada
		lista.children[i].addEventListener("click", eleminarTarea);
	}
}());
