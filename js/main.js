const http = require('http');
const fs = require('fs');

http.createServer((req, res) =>{

    if(req.method == 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./index.html', 'UTF-8').pipe(res);
    }else if(req.method == 'POST'){
        
        let body = '';

        req.on('data', chunk =>{body+= chunk;});

        req.on('end', () =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width", user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="css/estilos.css">
	<link rel="stylesheet" href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">
	<title>Lista de Tareas Resultados</title>
</head>

<body>
	<h1>Formulario de listas datos</h1>
	<p>${body}</p>
</body>
</html>
            `);
        });
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
