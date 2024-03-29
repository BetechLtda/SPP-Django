
class Gantt {
    constructor(tasks) {
        this.tasks = tasks;
        this.dateWidth = 178;
        this.filteredTasks = tasks;
        this.setMinAndMaxDate();
        document.getElementById('gantt').innerHTML = this.buildTableHeader() + this.buildTableBody();
        this.attachEventListeners();
    }

    setMinAndMaxDate() {
        var maxDates = [];
        var minDates = [];

        for (let i = 0; i < this.tasks.length; i++) {
            minDates.push(new Date(this.tasks[i][1]));
            maxDates.push(new Date(this.tasks[i][2]));
        }
        this.minDate = new Date(Math.min.apply(null, minDates));
        this.maxDate = new Date(Math.max.apply(null, maxDates));
    }
    //Revisar Filtros semana, meses
    diffInMonths(max, min) {
        return (max.getFullYear() - min.getFullYear()) * 12 + max.getMonth() - min.getMonth();
    }

    diffInWeeks(max, min) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const diffTime = Math.abs(max - min);
        return Math.ceil(diffTime / oneWeek);
    }
    //Tabla carta gantt
    buildTableHeader() {
        var html = '<table ><thead  style="position: sticky; top: 0; background-color: white; z-index: 1;width: 400px;"><tr>';

        const selectedPeriod = document.querySelector('select[name="periodos"]').value;
        const isDiarioSelected = selectedPeriod === "diario";
        const isSemanalSelected = selectedPeriod === "semanal";
        const isMensualSelected = selectedPeriod === "mensual";
        //Encabezado
        if (isDiarioSelected) {
            var diffDays = this.diffInDays(this.maxDate, this.minDate) + 1;
            const actual = new Date(this.minDate);

            for (let i = 0; i < diffDays; i++) {
                html += '<th style="color: white; width: 80vh; ">' + this.formatDate(actual, "diario") + '</th>';
                actual.setDate(actual.getDate() + 1); // Avanza un día
            }

        } else if (isSemanalSelected) {
            var diffWeeks = this.diffInWeeks(this.maxDate, this.minDate) + 1;
            const actual = new Date(this.minDate);

            for (let i = 0; i < diffWeeks; i++) {
                const startOfWeek = new Date(actual);
                const endOfWeek = new Date(actual);
                endOfWeek.setDate(startOfWeek.getDate() + 6);

                html += '<th>' + this.formatDate(startOfWeek, "semanal", endOfWeek) + '</th>';
                actual.setDate(startOfWeek.getDate() + 7);
            }
        } else if (isMensualSelected) {
            var diffMonths = this.diffInMonths(this.maxDate, this.minDate) + 1;
            const actual = new Date(this.minDate);

            for (let i = 0; i < diffMonths; i++) {
                actual.setMonth(actual.getMonth() + 1);
                html += '<th>' + this.formatDate(actual, "mensual") + '</th>';
            }
        }

        html += '</tr></thead><tbody">';
        return html;
    }



    buildTableBody() {
        var html = '';
    
        for (let i = 0; i < this.filteredTasks.length; i++) {
            var task = this.filteredTasks[i];
    
            var dMin = new Date(task[3]);
            var dMax = new Date(task[2]);
    
            // Calcular la diferencia en días entre dMin y dMax
            var dateDiff = this.diffInDays(dMax, dMin);
    
            var daysBefore = this.diffInDays(this.minDate, dMin);
            var daysAfter = this.diffInDays(dMax, this.maxDate);
    
            // Ensure that daysBefore is at least 0 (minimum start date constraint)
            daysBefore = Math.max(daysBefore, 0);
    
            // Ensure that daysAfter is at least 0 (maximum end date constraint)
            daysAfter = Math.max(daysAfter, 0);
    
            console.log('Fecha de inicio (dMin):', dMin);
            console.log('Fecha de finalización (dMax):', dMax);
    
            html += '<tr>';
    
            for (let j = 0; j < daysBefore; j++) {
                html += '<td></td>';
            }
    
            html += `<td class="event-cell" colspan="${dateDiff}" style="background-color: ${task[4]}; border: 1px solid #000;">
                <span>${task[5]}%</span>
                <a class="popup-link" data-pedido-id="${i}" data-popup-type="pedido"${i}">${task[6]}</a>
            </td>`;
    
            for (let j = 0; j < daysAfter; j++) {
                html += '<td></td>';
            }
    
            html += '</tr>';

        }
        return html;
    }



    buildSecondTable() {
        var html = '<table class="second-table"><thead><tr>';

        // Agregar dos columnas adicionales a la izquierda
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Linea Produccion</th>';
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Productos</th>';
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Escuadrias</th>';

        // Copiar el encabezado de la primera tabla
        const selectedPeriod = document.querySelector('select[name="periodos"]').value;
        const isDiarioSelected = selectedPeriod === "diario";
        const isSemanalSelected = selectedPeriod === "semanal";
        const isMensualSelected = selectedPeriod === "mensual";

        if (isDiarioSelected) {
            var diffDays = this.diffInDays(this.maxDate, this.minDate) + 1;
            const actual = new Date(this.minDate);

            for (let i = 0; i < diffDays; i++) {
                html += '<th style="color: white; width: 70vh; font-size: 13px;">' + this.formatDate(actual, "diario") + '</th>';
                actual.setDate(actual.getDate() + 1);
            }
        } else if (isSemanalSelected) {
            var diffWeeks = this.diffInWeeks(this.maxDate, this.minDate) + 1;
            const actual = new Date(this.minDate);

            for (let i = 0; i < diffWeeks; i++) {
                const startOfWeek = new Date(actual);
                const endOfWeek = new Date(actual);
                endOfWeek.setDate(startOfWeek.getDate() + 6);

                html += '<th>' + this.formatDate(startOfWeek, "semanal", endOfWeek) + '</th>';
                actual.setDate(startOfWeek.getDate() + 7);
            }
        } else if (isMensualSelected) {
            var diffMonths = this.diffInMonths(this.maxDate, this.minDate) + 1;
            const actual = new Date(this.minDate);

            for (let i = 0; i < diffMonths; i++) {
                actual.setMonth(actual.getMonth() + 1);
                html += '<th>' + this.formatDate(actual, "mensual") + '</th>';
            }
        }

        html += '</tr></thead><tbody>';

        // Utiliza una variable diferente para el cuerpo de la tabla
        var bodyHtml = '';

        // Itera sobre cada producto y crea una fila por producto
        for (let i = 0; i < this.filteredTasks.length; i++) {
            var task = this.filteredTasks[i];

            for (let j = 0; j < task[11].length; j++) { // Itera sobre la lista de productos en task[11]
                var product = task[11][j]; // Obtiene el nombre del producto
                var largo = task[14][j];
                var ancho = task[15][j];
                var alto = task[16][j];
                var dMin = new Date(task[3]);
                var dMax = new Date(task[2]);

                // Calcular la diferencia en días entre dMin y dMax
                var dateDiff = this.diffInDays(dMax, dMin);

                var daysBefore = this.diffInDays(this.minDate, dMin);
                var daysAfter = this.diffInDays(dMax, this.maxDate);

                // Ensure that daysBefore is at least 0 (minimum start date constraint)
                daysBefore = Math.max(daysBefore, 0);

                // Ensure that daysAfter is at least 0 (maximum end date constraint)
                daysAfter = Math.max(daysAfter, 0);

                console.log('Fecha de inicio (dMin):', dMin);
                console.log('Fecha de finalización (dMax):', dMax);

                bodyHtml += '<tr>';

                // Agregar el valor de task[7] en la primera columna
                bodyHtml += `<td>${task[7]}</td>`;

                // Agregar el nombre del producto en la segunda columna
                bodyHtml += `<td>${product}</td>`;


                bodyHtml += `<td>L:${largo} A:${ancho} Al:${alto}</td>`;


                for (let k = 0; k < daysBefore; k++) {
                    bodyHtml += '<td ></td>';
                }

                bodyHtml += `<td class="event-cell" colspan="${dateDiff}" style="background-color: ${task[13]}; border: 1px solid #000;">
                    <span>${task[5]}%</span>
                    <a class="popup-link" data-pedido-id="${i}" data-popup-type="producto">U ${task[8]}</a>
                </td>`;

                for (let k = 0; k < daysAfter; k++) {
                    bodyHtml += '<td></td>';
                }

                bodyHtml += '</tr>';
                
            }
        }

        // Agrega el cuerpo de la tabla al encabezado
        html += bodyHtml;

        html += '</tbody></table>';
        return html;
    }

    SalidaTable() {
        var html = '<table class="second-table"><thead><tr>';

        // Agregar dos columnas adicionales a la izquierda
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Linea Produccion</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Item</th>'; /**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Folio</th>'; /**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Cliente</th>'; /**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">OP</th>'; /**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Mercado</th>'; /**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Productos</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">ETA</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">L/A/AL</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">PQTES.Solicitados</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">PQTES.Saldo</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Trozos</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Ø</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Largo Trozos</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Grado de Urgencia</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Lateral</th>';/*por determinar*/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Nota</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Cant.desep.de 20MM</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">Largo del Taco</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">OBS</th>';/**/
        html += '<th style="color: white; width: 30vh; font-size: 13px;">M3 Prod.</th>';/**/



        html += '</tr></thead><tbody>';

        // Utiliza una variable diferente para el cuerpo de la tabla
        var bodyHtml = '';

        // Itera sobre cada producto y crea una fila por producto
        for (let i = 0; i < this.filteredTasks.length; i++) {
            var task = this.filteredTasks[i];

            for (let j = 0; j < task[11].length; j++) { // Itera sobre la lista de productos en task[11]
                var product = task[11][j]; // Obtiene el nombre del producto
                var largo = task[14][j];
                var ancho = task[15][j];
                var alto = task[16][j];


                var dMin = new Date(task[3]);
                var dMax = new Date(task[2]);

                // Calcular la diferencia en días entre dMin y dMax
                var dateDiff = this.diffInDays(dMax, dMin);

                var daysBefore = this.diffInDays(this.minDate, dMin);
                var daysAfter = this.diffInDays(dMax, this.maxDate);

                // Ensure that daysBefore is at least 0 (minimum start date constraint)
                daysBefore = Math.max(daysBefore, 0);

                // Ensure that daysAfter is at least 0 (maximum end date constraint)
                daysAfter = Math.max(daysAfter, 0);

                console.log('Fecha de inicio (dMin):', dMin);
                console.log('Fecha de finalización (dMax):', dMax);

                bodyHtml += '<tr>';

                bodyHtml += `<td>${task[7]}</td>`;/*Linea de Produccion*/
                bodyHtml += `<td></td>`;/*Item*/
                bodyHtml += `<td></td>`;/*Folio  / pedido id?*/
                bodyHtml += `<td></td>`;/*Cliente*/
                bodyHtml += `<td></td>`;/*OP*  / pedido id?*/
                bodyHtml += `<td></td>`;/*Mercado*/
                bodyHtml += `<td>${product}</td>`;/*Producto*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td>L:${largo} A:${ancho} Al:${alto}</td>`;/*Diametros*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/
                bodyHtml += `<td></td>`;/*ETA*/

                bodyHtml += '</tr>';
            }
        }

        // Agrega el cuerpo de la tabla al encabezado
        html += bodyHtml;

        html += '</tbody></table>';
        return html;
    }


    showPedidosTable() {
        this.filteredTasks = this.tasks;
        document.getElementById('gantt').innerHTML = this.buildTableHeader() + this.buildTableBody();
    }

    showProductosTable() {
        this.filteredTasks = this.tasks;
        document.getElementById('gantt').innerHTML = this.buildSecondTable();

    }

    showSalidaTable() {
        this.filteredTasks = this.tasks;
        document.getElementById('gantt').innerHTML = this.SalidaTable();

    }

    diffInDays(max, min) {
        var diffTime = Math.abs(max - min);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    formatDate(date, period, endDate) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // Agrega ceros iniciales si es necesario
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        if (period === "diario") {
            return `${formattedDay}-${formattedMonth}-${year}`;
        } else if (period === "semanal") {
            const weekStart = new Date(date);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            const startDay = weekStart.getDate();
            const endDay = weekEnd.getDate();

            return `${formattedDay}-${formattedMonth}-${year} al ${endDay}-${formattedMonth}-${year}`;
        } else if (period === "mensual") {
            const monthStart = new Date(date);
            monthStart.setDate(1);
            const monthEnd = new Date(date);
            monthEnd.setMonth(monthEnd.getMonth() + 1, 0);

            const endDay = monthEnd.getDate();

            if (formattedMonth === monthEnd.getMonth() + 1) {
                return `${formattedDay}-${formattedMonth}-${year}`;
            } else {
                return `${formattedDay}-${formattedMonth}-${year} al ${endDay}-${monthEnd.getMonth() + 1}-${year}`;
            }
        }
    }

    getMonthName(month) {
        return new Date(2020, month - 1, 1).toLocaleString('default', { month: 'long' });
    }

    filterTasksByLine(lineValue) {
        if (lineValue === "lineas") {
            this.filteredTasks = this.tasks;
        } else {
            this.filteredTasks = this.tasks.filter(task => task[6] === lineValue);
        }

        document.getElementById('gantt').innerHTML = this.buildTableHeader() + this.buildTableBody();
    }

    attachEventListeners() {
        console.log('Attaching event listeners');
        const popupLinks = document.querySelectorAll('.popup-link');
        console.log('Popup links found:', popupLinks.length);

        const self = this; // Store a reference to the current instance

        document.getElementById('gantt').addEventListener('click', function (event) {
            const target = event.target;
            if (target.classList.contains('popup-link')) {
                self.handlePopupClick(event);
            }
        });
    }



    handlePopupClick(event) {
        console.log('Popup link clicked');
        event.stopPropagation();// Evita que el evento se propague al contenedor principal
        const pedidoId = parseInt(event.target.dataset.pedidoId); // Obtenemos el ID del pedido desde el atributo data-pedido-id
        const productoId = event.target.dataset.productoId;
        const popupType = event.target.dataset.popupType; // Obtenemos el tipo de popup
        const popup = document.createElement('div');
        popup.className = 'popup-overlay';
        console.log('Pedido ID:', pedidoId);
        let pedidoData = this.tasks[pedidoId]; // Cambio a let
        let productoData = this.tasks[productoId]; // Cambio a let
        const self = this; // Store a reference to the current instance
        if (popupType === 'pedido') {
            pedidoData = this.tasks[pedidoId];
            popup.innerHTML = `

        <div class="popup-content" id="popup">
        <h2>Detalles del pedido</h2>
        <div class="popup-item">
            <strong>Código:</strong> <span>${pedidoData[0]}</span>
        </div>
        <div class="popup-item">
            <strong>Cliente:</strong> <span>${pedidoData[9]}</span>
        </div>
        <div class="popup-item">
            <strong>Nombre:</strong> <span>${pedidoData[6]}</span>
        </div>
        <div class="popup-item">
            <strong>Fecha de entrega:</strong> <span>${pedidoData[2]}</span>
        </div>
        <div class="popup-item">
            <strong>Producto:</strong> <span>${pedidoData[11]}</span>
        </div>
        <div class="popup-item">
            <strong>Cantidad:</strong> <span>${pedidoData[8]}</span>
        </div>
        <div class="popup-item">
            <strong>Prioridad:</strong> <span>${pedidoData[12]}</span>
        </div>
        <div class="popup-item">
            <strong>Linea produccion:</strong> <span>${pedidoData[7]}</span>
        </div>
        <div class="popup-item">
            <strong>Progreso:</strong> <span>${pedidoData[5]}</span>
        </div>
        <div class="popup-item">
            <strong>Comentario:</strong> <span>${pedidoData[10]}</span>
        </div>
        <button class="close-button" >Cerrar</button>
    </div>`;


        } else if (popupType === 'producto') {
            productoData = this.tasks[pedidoId];
            popup.innerHTML = `
            <div class="popup-content" id="popup">
            <h2>Detalles del producto</h2>
            <div class="popup-item">
                <strong>Código:</strong> <span>${productoData[17]}</span>
            </div>
            <button class="close-button" >Cerrar</button>
            </div>
        `;
        }

        document.body.appendChild(popup);

        // Add a click event listener to the close button
        const closeButton = popup.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            self.closePopup(popup);
        });
        
    }

    closePopup(popup) {
        popup.style.display = 'none';
    }
}


const periodosSelect = document.querySelector('select[name="periodos"]');
periodosSelect.value = "diario";
periodosSelect.addEventListener('change', function () {
    gantt.setMinAndMaxDate();
    document.getElementById('gantt').innerHTML = gantt.buildTableHeader() + gantt.buildTableBody();
});

const toggleLineasButton = document.getElementById('toggle-lineas-button');
toggleLineasButton.addEventListener('change', function () {
    const selectedLine = this.value;
    gantt.filterTasksByLine(selectedLine);
});

function toggleCargaForm() {
    const cargaForm = document.getElementById('carga-form');
    if (cargaForm.style.display === 'none') {
        cargaForm.style.display = 'block';
    } else {
        cargaForm.style.display = 'none';
    }
}

function showPopup() {
    const popupOverlay = document.getElementById('popup-ejecutar');
    popupOverlay.style.display = 'block';
}

function hidePopup() {
    const popupOverlay = document.getElementById('popup-ejecutar');
    popupOverlay.style.display = 'none';
    window.location.href = '/pantalla-carga/';
}

// Fisher-Yates shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Add your shuffleButton click event listener here
const shuffleButton = document.getElementById('shuffleButton');
shuffleButton.addEventListener('click', () => {
    shuffle(gantt.tasks);
    gantt.setMinAndMaxDate();
    document.getElementById('gantt').innerHTML = gantt.buildTableHeader() + gantt.buildTableBody();
    gantt.attachEventListeners();
});
//Popup para importar
function showPopupimport() {
    const popupOverlay = document.getElementById('popupContainer');
    popupOverlay.style.display = 'block';
}

function closePopupimport() {
    const popupOverlay = document.getElementById('popupContainer');
    popupOverlay.style.display = 'none';
}

// Función para cerrar el popup
function closePopup() {
    var popup = document.getElementById("carga-form");
    popup.style.display = "none";
}


