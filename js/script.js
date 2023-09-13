// window.onload = function () {
//     drawList();
// };

// var peopleWrap = document.getElementById('peopleWrap');
// var people = document.getElementById('people');
// var choose = document.getElementById('choose');
// var result = document.getElementById('result');
// var close = document.getElementById('close');

// function drawList() {
//     fetch('conexion.php') // Cambia la URL a tu script PHP para obtener datos de la tabla "users".
//         .then(response => response.json())
//         .then(data => {
//             // Limpia la lista desplegable antes de agregar opciones nuevas.
//             people.innerHTML = '<option value="">Who are you?</option>';

//             data.forEach(nombre => {
//                 const option = document.createElement('option');
//                 option.value = nombre; // Utiliza el nombre como valor
//                 option.innerHTML = nombre;
//                 people.appendChild(option);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }


// choose.onclick = function () {
//     var selectedPerson = people.value; // Obtiene el valor seleccionado correctamente.
    
//     if (selectedPerson) {
//         // Realiza una solicitud AJAX para actualizar el estado en la tabla users.
//         fetch('modificar_estado.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: 'name=' + encodeURIComponent(selectedPerson), // Usa 'name' en lugar de 'selectedPerson'.
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 // Si la actualización del estado fue exitosa, procede con la selección.
//                 selectPerson(selectedPerson);
//             } else {
//                 // Si hubo un problema con la actualización del estado, muestra un mensaje de error.
//                 result.innerHTML = "<h2>Error updating the status.</h2>";
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }
// };

// function selectPerson(person) {
//     if (person) {
//         fetch('conexion.php') // Cambia la URL a tu script PHP para obtener datos de la tabla "users".
//             .then(response => response.json())
//             .then(data => {
//                 // Filtra el usuario seleccionado de los datos obtenidos.
//                 const selectedUser = data.find(user => user === person);

//                 if (selectedUser) {
//                     const remainingUsers = data.filter(user => user !== person);

//                     if (remainingUsers.length > 0) {
//                         const recipientIndex = Math.floor(Math.random() * remainingUsers.length);
//                         const recipientName = remainingUsers[recipientIndex];

//                         result.innerHTML = `<h2>${selectedUser}, you&rsquo;ve got ${recipientName}!</h2>`;

//                         // Actualiza la lista de usuarios disponibles.
//                         const updatedUsers = remainingUsers.filter(user => user !== recipientName);
//                         updatedUsers.push(selectedUser);

//                         // Vuelve a cargar la lista actualizada.
//                         drawList();
//                     } else {
//                         result.innerHTML = "<h2>All done!</h2>";
//                         close.innerHTML = "";
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }
// }

// close.onclick = function () {
//     result.innerHTML = "";
//     close.innerHTML = "";
//     if (give.length == 0) {
//         peopleWrap.parentNode.removeChild(peopleWrap);
//         choose.parentNode.removeChild(choose);
//         result.innerHTML = "<h2>All done!</h2>";
//         close.innerHTML = "";
//     }
// };


// choose.onclick = function () {
//     if (people.value) {
//         selectPerson(people.value);
//     }
// };


// close.onclick = function () {
//     result.innerHTML = "";
//     close.innerHTML = "";
// };

window.onload = function () {
    drawList();
};

var people = document.getElementById('people');
var choose = document.getElementById('choose');
var result = document.getElementById('result');
var close = document.getElementById('close');

function drawList() {
    fetch('conexion.php') // Cambia la URL a tu script PHP para obtener datos de la tabla "users".
        .then(response => response.json())
        .then(data => {
            // Limpia el select antes de agregar opciones nuevas.
            people.innerHTML = '<option value="">¿Quien eres?</option>';

            data.forEach(nombre => {
                const option = document.createElement('option');
                option.value = nombre; // Utiliza el nombre como valor
                option.innerHTML = nombre;
                people.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

choose.onclick = function () {
    var selectedPerson = people.value;

    if (selectedPerson) {
        // Realiza una solicitud AJAX para obtener la lista de usuarios "libres" disponibles
        fetch('conexion.php')
            .then(response => response.json())
            .then(data => {
                var remainingUsers = data.filter(user => user !== selectedPerson);
                var numRemainingUsers = remainingUsers.length;

                if (numRemainingUsers >= 1) {
                    var recipientIndex;

                    do {
                        recipientIndex = Math.floor(Math.random() * numRemainingUsers);
                    } while (remainingUsers[recipientIndex] === selectedPerson);

                    var recipientName = remainingUsers[recipientIndex];

                    // Realiza una solicitud AJAX para actualizar el estado del remitente a "nolibre"
                    fetch('modificar_estado.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: 'name=' + encodeURIComponent(selectedPerson),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Actualiza la lista con el remitente ya actualizado
                            drawList();

                            // Muestra el nombre asignado aleatoriamente
                            result.innerHTML = `<h2>${selectedPerson}, Te tocó ${recipientName}!</h2>`;

							close.innerHTML = "Okay. Destruye este mensaje.";
	
                        } else {
                            // Si hubo un problema con la actualización del estado del remitente, muestra un mensaje de error.
                            result.innerHTML = "<h2>Error updating the sender's status.</h2>";
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                } else {
                    // Manejo si no hay suficientes destinatarios disponibles para asignar
                    result.innerHTML = "<h2>No hay suficientes usuarios disponibles para la asignación.</h2>";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
};

close.onclick = function () {
    result.innerHTML = "";
};


