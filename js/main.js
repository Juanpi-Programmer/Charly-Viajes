//ADMIN PAGINA

var horariosUI = document.getElementById('horariosRespuesta');

//CREACION DEL ARRAY QUE VA A CONTENER LOS OBJETOS
let horariosAlmacenados = [];

//FUNCIONES
//me dice si hay o no datos cargados en la BD ("Base de Datos")
CargaHorarios_oNo();

//crear los horarios
const CrearHorarios = (ida, vuelta, hsalida, hllegada, fechaSalida, asientos) => {
        //creacion del objeto con sus atributos
        let horariosOb = {
            ida: ida,
            vuelta: vuelta,
            hsalida: hsalida,
            hllegada: hllegada,
            fechaSalida: fechaSalida,
            asientos: asientos,
            PK: 1
        }
        for (let i = 0; i < horariosAlmacenados.length; i++) {
            if (horariosAlmacenados.length > 0) {
                horariosOb.PK++;
            }
        }

        if (horariosAlmacenados.length >= 5) {
            alert('supero el maximo de carga')
        } else {
            console.log('CARGA REALIZADA')
            horariosAlmacenados.push(horariosOb);
        }

        GuardarHorarios();
        return horariosOb;
    }
    //guardar horarios
const GuardarHorarios = () => {
        localStorage.setItem('CargaHorarios', JSON.stringify(horariosAlmacenados));
        PintarHorarios();
    }
    //Imprime por pantalla ADMIN Horarios Almacenados
const PintarHorarios = () => {
    horariosUI.innerHTML = '';
    horariosAlmacenados = JSON.parse(localStorage.getItem('CargaHorarios'));
    if (horariosAlmacenados === null) {
        horariosAlmacenados = []
    } else {
        //recorro el array con un forEach
        horariosAlmacenados.forEach(element => {
            horariosUI.innerHTML += `<tr><td>${element.PK}</td><td>${element.ida} ${element.vuelta}</td>
<td>${element.hsalida}</td><td>${element.hllegada}</td><td>${element.fechaSalida}</td><td>${element.asientos}</td></tr>`
        });
    }
}

//carga horarios ADMIN
$('.cargar').on('click', function(e) {
    e.preventDefault();
    var fechaSalida = document.getElementById('adCalendario').value;
    var adOrigen = document.getElementById('adOrigen').value;
    var adDestino = document.getElementById('adDestino').value;
    var hSalida = document.getElementById('HorarioSalida').value;
    var hLlegada = document.getElementById('HorarioLlegada').value;
    var asientos = document.getElementById('asientos').value;

    if (adOrigen === '') {
        alert('COMPLETE ORIGEN');
    } else if (adOrigen === adDestino) {
        alert('ORIGEN Y DESTINO SON IGUALES');
    } else if (hSalida === '') {
        alert('COMPLETE SALIDA');
    } else if (hLlegada === '') {
        alert('COMPLETE LLEGADA');
    } else if (hSalida === hLlegada) {
        alert('LA HORA DE SALIDA Y LLEGADA SON LAS MISMAS');
    } else if (fechaSalida == '') {
        alert('LA FECHA DEBE ESTAR');
    } else if (asientos == '') {
        alert('ASIENTOS DEBE ESTAR COMPLETO')
    } else {
        //le paso como parametros lo que el admin ingresa para que llene el objeto HorariosOb
        CrearHorarios(adOrigen, adDestino, hSalida, hLlegada, fechaSalida, asientos);
        CargaHorarios_oNo();
    }
});

//corrobora si hay o no horarios cargados
function CargaHorarios_oNo() {
    if (localStorage.getItem('CargaHorarios')) {
        $('#of_on').css({
            background: 'green',
            margin: '13px',
            color: 'white',
            'font-size': '15px'
        })
        $('#of_on').text('Hay Horarios Cargados');
    } else {
        $('#of_on').css({
            background: 'red',
            margin: '13px',
            color: 'white',
            'font-size': '15px'
        })
        $('#of_on').text('No hay Horarios Cargados');
    }
}

let reservasArray = [];
//RESERVACIONES VUELOS

let reservasCargadas = document.getElementById('reservasCargadasRe');

//imprime por pantalla ADMIN la reserva del user
const pintarRerserva = () => {
    reservasCargadas.innerHTML = '';
    reservasArray = JSON.parse(localStorage.getItem('reservas'));

    if (reservasArray === null) {
        reservasArray = [];
    } else {
        reservasArray.forEach(e => {
            reservasCargadas.innerHTML += `<tr><td class='userVuelo'>${e.numVuelo}</td><td>${e.nombre}</td><td>${e.apellido}</td>
<td>${e.fechaVuelo}</td><td>${e.hvuelo}</td><td>${e.origenDestino}</td></tr>`
        });
    }
}

document.addEventListener("DOMContentLoaded", pintarRerserva);

let muestraReservas = document.querySelector('.muestraIndex');
$('.muestraIndex').hide();
const reservasIndex = () => {
    muestraReservas.innerHTML = '';

    reservasArray = JSON.parse(localStorage.getItem('reservas'));

    if (reservasArray === null) {
        reservasArray = [];
    } else {
        reservasArray.forEach(e => {
            muestraReservas.innerHTML += `<p>${e.numVuelo}</p><p>${e.nombre}</p>`
        });
    }
}
const diaHoy = new Date();
let ano = diaHoy.getFullYear(),
    mes = diaHoy.getMonth() + 1,
    dia = diaHoy.getDate();

const theBigDay = new Date('Febrary 12, 2020');
let anoMax = theBigDay.getFullYear(),
    mesMax = theBigDay.getMonth() + 1,
    diaMax = theBigDay.getDate();
//creamos una variable que concatene año mes y dia para poder dp modificar fecha min
let fechaMin = ano + '-' + '0' + mes + '-' + dia;
let fechaMax = anoMax + '-' + mesMax + '-' + diaMax;
$('.fechas input').attr({
    'min': fechaMin,
    'max': fechaMax
});
$('#adCalendario').attr({
    'min': fechaMin,
    'max': fechaMax
})


$('.alert-primary').hide();
//PANTALLA DEL USER
$(function() {

    //CARGANDO - GIF
    $(window).load(function() {
        $(".loader").fadeOut("slow");
    });
    //llamo a la primera etiqueta 'a' (ida/vuelta) le anado la clase activo 
    $('.seleccionadores a:first').addClass('activo')
        //ERROR    
    $('.alert-danger').hide();
    $('.close').hide();
    $('.close').on('click', function() {
        //cuando haga click en boton cerrar, se oculta el alerta y el boton
        $('.alert-danger').hide();
        $('.close').hide();
    });
    //origen y destino (input)
    let origen = document.getElementById('selectOrigen');
    let destino = document.getElementById('selectDestino');
    //calendario
    let calendarioIda = document.getElementById('calendarioIda');
    //Seleccion de Personas
    let adultos = document.getElementById('adultos');

    var buscar = document.getElementById('buscar');

    //busqueda principal usuario
    function busquedaPrincipal() {
        //VARIABLES del user
        //VALIDACIONES
        //ORIGEN Y DESTINO
        if (origen.value === destino.value) {
            $('.alert-danger').show();
            $('.close').show();
            $('.alert-danger').text('El Origen y el destino son iguales');
        }
        //Caledario Validacion
        else if (calendarioIda.value == '') {
            $('.alert-danger').show();
            $('.close').show();
            $('.alert-danger').text('Error en el calendario');
        }
        //PASAJEROS VALIDACION
        else if (adultos.value != 1) {
            $('.alert-danger').show();
            $('.close').show();
            $('.alert-danger').text('La cantidad Maxima de Tickets es de 1');
        } else {
            PintarTickets();
        }
    }

    //Comienza Pagina PRINCIPAL

    var contenedorTicket = document.querySelector('.busquedaPrincipal');
    //muestra los tickets a comprar USER
    const PintarTickets = () => {
            //Mostrar los vuelos disponibles
            contenedorTicket.innerHTML = '';
            horariosAlmacenados = JSON.parse(localStorage.getItem('CargaHorarios'));
            let reservasHechas = JSON.parse(localStorage.getItem('reservas'));
            let sumaDeReservasHechas = 0;

            for (let i = 0; i < horariosAlmacenados.length; i++) {
                if (origen.value == horariosAlmacenados[i].ida) {
                    if (destino.value == horariosAlmacenados[i].vuelta) {
                        if (calendarioIda.value == horariosAlmacenados[i].fechaSalida) {
                            if (reservasHechas) {
                                for (let j = 0; j < reservasHechas.length; j++) {
                                    if (reservasHechas[j].numVuelo == horariosAlmacenados[i].PK) {
                                        sumaDeReservasHechas++;
                                    }
                                }
                                if (horariosAlmacenados[i].asientos > sumaDeReservasHechas) {
                                    $('#alert-disponible').hide();
                                    $('.busquedaPrincipal').show();
                                    contenedorTicket.innerHTML += `
                                    <div class="conteiner-busqueda">
                                        <div class="conteiner-ida">
                                            <div class="ida-contenedor">
                                                <div class="primerBloque bloque">
                                                    <div class="fecha">
                                                        <i class="fas fa-plane"></i>
                                                        <h4>Ida</h4>
                                                        <p class="fechaIda" id="fechaEntry">${horariosAlmacenados[i].fechaSalida}</p>
                                                    </div>
                                                    <div class="origen">
                                                        <h4 id="origenEntry">${horariosAlmacenados[i].ida}</h4>
                                                    </div>
                                                    <div class="destino">
                                                        <h4 id="destinoEntry">${horariosAlmacenados[i].vuelta}</h4>
                                                    </div>
                                                </div><!--Cierra Primer Bloque-->
    
                                                <div class="segundoBloque bloque">
                                                    <div class="aerolinea">
                                                        <img src="img/menem.png" alt="">
                                                        <p>Charly´s Viajes</p>
                                                    </div>
                                                    <div class="horaSalida">
                                                        <p><span id="hsalidaEntry">${horariosAlmacenados[i].hsalida}</span></p>
                                                    </div>
                                                    <div class="horaLlegada">
                                                        <p><span id="hllegadaEntry">${horariosAlmacenados[i].hllegada}</span></p>
                                                    </div>
                                                </div><!--Cierra Segundo Bloque-->
                                                <p class='numVuelo'>${horariosAlmacenados[i].PK}</p>
                                            </div><!--ida-contenedors-->
                                        </div>
    
                                        <div class="preciosBusqueda">
                                            <div class="asientosDisponibles">
                                                <p class="disponibles" id="asientosEntry">Asientos Disponibles</p>
                                            </div>
                                            <p class="nombrePasajero">Precio por Adulto</p>
                                            <p><span class="preciosPasajero">$ 10.236</span></p>
                                            <hr>
                                            <div class="pasajerosCosto">
                                                <div class="texto-costo">
                                                    <ul>
                                                        <li>1 Adulto</li>
                                                        <li>Tasas de impuesto</li>
                                                        <li>Cargos</li>
                                                    </ul>
                                                </div>
                                                <div class="costoTotal">
                                                    <ul>
                                                        <li>$10.236</li>
                                                        <li>$1.804</li>
                                                        <li>$241</li>
                                                    </ul>
                                                </div>
                                            </div>
    
                                            <p><span>Total</span></p>
                                            <p>$12.281</p>
                                            <button class="btn btn-success" id="compraTicket">Comprar</button>
                                        </div>
                                        <!--conteiner-busqueda manana-->            
                                    </div>`;
                                    break;
                                } else {
                                    console.log('supere el maximo de asientos');
                                    $('#alert-disponible').show();
                                }
                            } else {
                                $('#alert-disponible').hide();
                                $('.busquedaPrincipal').show();
                                contenedorTicket.innerHTML += `
                                <div class="conteiner-busqueda">
                                    <div class="conteiner-ida">
                                        <div class="ida-contenedor">
                                            <div class="primerBloque bloque">
                                                <div class="fecha">
                                                    <i class="fas fa-plane"></i>
                                                    <h4>Ida</h4>
                                                    <p class="fechaIda" id="fechaEntry">${horariosAlmacenados[i].fechaSalida}</p>
                                                </div>
                                                <div class="origen">
                                                    <h4 id="origenEntry">${horariosAlmacenados[i].ida}</h4>
                                                </div>
                                                <div class="destino">
                                                    <h4 id="destinoEntry">${horariosAlmacenados[i].vuelta}</h4>
                                                </div>
                                            </div><!--Cierra Primer Bloque-->

                                            <div class="segundoBloque bloque">
                                                <div class="aerolinea">
                                                    <img src="img/menem.png" alt="">
                                                    <p>Charly´s Viajes</p>
                                                </div>
                                                <div class="horaSalida">
                                                    <p><span id="hsalidaEntry">${horariosAlmacenados[i].hsalida} </span></p>
                                                </div>
                                                <div class="horaLlegada">
                                                    <p><span id="hllegadaEntry">${horariosAlmacenados[i].hllegada} </span></p>
                                                </div>
                                            </div><!--Cierra Segundo Bloque-->
                                            <p class='numVuelo'>${horariosAlmacenados[i].PK} </p>
                                        </div><!--ida-contenedors-->
                                    </div>

                                    <div class="preciosBusqueda">
                                        <div class="asientosDisponibles">
                                            <p class="disponibles" id="asientosEntry">Asientos Disponibles</p>
                                        </div>
                                        <p class="nombrePasajero">Precio por Adulto</p>
                                        <p><span class="preciosPasajero">$ 10.236</span></p>
                                        <hr>
                                        <div class="pasajerosCosto">
                                            <div class="texto-costo">
                                                <ul>
                                                    <li>1 Adulto</li>
                                                    <li>Tasas de impuesto</li>
                                                    <li>Cargos</li>
                                                </ul>
                                            </div>
                                            <div class="costoTotal">
                                                <ul>
                                                    <li>$10.236</li>
                                                    <li>$1.804</li>
                                                    <li>$241</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <p><span>Total</span></p>
                                        <p>$12.281</p>
                                        <button class="btn btn-success" id="compraTicket">Comprar</button>
                                    </div>
                                    <!--conteiner-busqueda manana-->            
                                </div>`;
                                break;
                            }
                        } else {
                            console.log('no tengo esa fecha cargada');
                            $('#alert-disponible').show();
                        }
                    } else {
                        $('#alert-disponible').show();
                    }
                } else {
                    $('#alert-disponible').show();
                }
            }

            //Fin del for para mostrar los vuelos disponibles

            //se ejecuta el codigo de compra
            $('#compraTicket').on('click', (e) => {
                e.preventDefault();
                $('.busquedaPrincipal').hide();
                $('.compraUI').fadeIn('slow');
                var boletoTable = document.querySelector('.boletoTable');
                boletoTable.innerHTML = '';
                //toma los valores del ticket
                var fechaIda = document.getElementById('fechaEntry').innerHTML;
                var origenEntry = document.getElementById('origenEntry').innerHTML;
                var destinoEntry = document.getElementById('destinoEntry').innerHTML;
                var hsalidaEntry = document.getElementById('hsalidaEntry').innerHTML;
                var hllegadaEntry = document.getElementById('hllegadaEntry').innerHTML;
                var numVuelo = document.querySelector('.numVuelo').innerHTML;

                console.log('comprar');
                //los manda a la tabla dark
                boletoTable.innerHTML += `<table class="table table-dark boletoTable">
            <thead><tr><th scope="col">#</th><th scope="col">Fecha Salida</th><th scope="col">Origen</th><th scope="col">Destino</th>
            <th scope="col">Horario Salida</th><th scope="col">Horario Llegada</th><th scope="col">Total</th>
            </tr></thead><tbody><tr><th scope="row">${numVuelo}</th><td id="fechaReserva">${fechaIda}</td><td id="origenReserva">${origenEntry}</td>
            <td id="destinoReserva">${destinoEntry}</td><td id="hsalidaReserva">${hsalidaEntry}</td><td id="llegadaReserva">${hllegadaEntry}</td><td>$12.281</td></tr>
            </tbody></table>`
            });
        }
        //SISTEMA COMPRA
    var comprarUI = document.getElementById('compraConfirmada');
    const SistemaCompra = (e) => {
        e.preventDefault();
        //datosUser
        var userName = document.querySelector('#userName').value;
        var userApellido = document.querySelector('#userApellido').value;
        var userDNI = document.querySelector('#userDNI').value;
        var CardNumber = document.querySelector('#CardNumber').value;
        $('#compraConfirmada').attr("disabled", true);
        //datosVuelo
        var fechaReserva = document.getElementById('fechaReserva').innerHTML,
            origenReserva = document.getElementById('origenReserva').innerHTML,
            destinoReserva = document.getElementById('destinoReserva').innerHTML,
            hsalidaReserva = document.getElementById('hsalidaReserva').innerHTML,
            llegadaReserva = document.getElementById('llegadaReserva').innerHTML,
            numVuelo = document.querySelector('.numVuelo').innerHTML,
            origenDestinoRe = origenReserva + '- ' + destinoReserva,
            horarioVueloRE = hsalidaReserva + '- ' + llegadaReserva;
        //Validaciones Compra
        if (userName === '') {
            $('.errorCompra').show();
            $('.errorCompra').text('Debe Ingresar su nombre');
            $('#compraConfirmada').attr("disabled", false);
        } else if (userApellido === '') {
            $('.errorCompra').show();
            $('.errorCompra').text('Debe Ingresar su Apellido');
            $('#compraConfirmada').attr("disabled", false);
        } else if (userDNI === '') {
            $('.errorCompra').show();
            $('.errorCompra').text('Debe Ingresar su DNI sin puntos');
            $('#compraConfirmada').attr("disabled", false);
        } else if (CardNumber === '') {
            $('.errorCompra').show();
            $('.errorCompra').text('Debe Ingresar una tarjeta valida');
            $('#compraConfirmada').attr("disabled", false);
        } else {
            let cliente = {
                nombre: userName,
                apellido: userApellido,
                fechaVuelo: fechaReserva,
                hvuelo: horarioVueloRE,
                origenDestino: origenDestinoRe,
                numVuelo: numVuelo
            }
            reservasArray.push(cliente);

            localStorage.setItem('reservas', JSON.stringify(reservasArray));

            window.location.replace("generateTicket.html");

            reservasIndex();
            pintarRerserva();
        }

    }

    buscar.addEventListener('click', busquedaPrincipal);
    comprarUI.addEventListener('click', SistemaCompra);
});
document.addEventListener("DOMContentLoaded", reservasIndex);
document.addEventListener("DOMContentLoaded", PintarHorarios);