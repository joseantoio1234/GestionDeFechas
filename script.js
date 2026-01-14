document.addEventListener('DOMContentLoaded', function() {
    // contenedor principal 
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    
    const title = document.createElement('h1');
    title.textContent = 'Gestión de Fechas - Cuenta Atrás';
    container.appendChild(title);
    
    // input para que el usuario elija la fecha 
    const label = document.createElement('p');
    label.textContent = 'Selecciona una fecha objetivo:';
    container.appendChild(label);

    const inputFecha = document.createElement('input');
    inputFecha.type = 'date';
    inputFecha.id = 'fechaObjetivo';
    inputFecha.style.padding = '10px';
    container.appendChild(inputFecha);
    
    // contenedor visual para el contador
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown';
    container.appendChild(countdownContainer);
    
    // unidades
    const unidades = [
        { id: 'months', label: 'Meses' },
        { id: 'days', label: 'Días' },
        { id: 'hours', label: 'Horas' },
        { id: 'minutes', label: 'Minutos' },
        { id: 'seconds', label: 'Segundos' }
    ];
    
    unidades.forEach(unit => {
        const timeUnit = document.createElement('div');
        timeUnit.className = 'time-unit';
        
        const number = document.createElement('div');
        number.className = 'number';
        number.id = unit.id;
        number.textContent = '0';
        
        const text = document.createElement('div');
        text.className = 'label';
        text.textContent = unit.label;
        
        timeUnit.appendChild(number);
        timeUnit.appendChild(text);
        countdownContainer.appendChild(timeUnit);
    });
    
    //  funcion para cambiar colores segun el tiempo restante 
    function actualizarColor(totalDias) {
        const boxes = document.querySelectorAll('.time-unit');
        boxes.forEach(b => b.classList.remove('color-green', 'color-orange', 'color-red'));

        if (totalDias > 30) {
            boxes.forEach(b => b.classList.add('color-green')); // + de un mes 
        } else if (totalDias > 7) {
            boxes.forEach(b => b.classList.add('color-orange')); // - de un mes 
        } else {
            boxes.forEach(b => b.classList.add('color-red')); // - de una semana 
        }
    }
    
    // funcion de calculo 
    function updateCountdown() {
        if (!inputFecha.value) return; // si no hay fecha no hace nada

        const ahora = new Date();
        const destino = new Date(inputFecha.value);
        let diff = destino - ahora;

        //  si la fecha a pasado todo a cero 
        if (diff < 0) diff = 0;

        // calculos de tiempo
        const seg = 1000, min = seg * 60, hor = min * 60, dia = hor * 24, mes = dia * 30;

        const mesesFaltan = Math.floor(diff / mes);
        const diasFaltan = Math.floor((diff % mes) / dia);
        const horasFaltan = Math.floor((diff % dia) / hor);
        const minutosFaltan = Math.floor((diff % hor) / min);
        const segundosFaltan = Math.floor((diff % min) / seg);

        
        document.getElementById('months').textContent = mesesFaltan;
        document.getElementById('days').textContent = diasFaltan;
        document.getElementById('hours').textContent = horasFaltan;
        document.getElementById('minutes').textContent = minutosFaltan;
        document.getElementById('seconds').textContent = segundosFaltan;

       
        const totalDiasParaColor = Math.floor(diff / dia);
        actualizarColor(totalDiasParaColor);
    }
    
    
    setInterval(updateCountdown, 1000); // se actualiza cada segundo
    inputFecha.addEventListener('change', updateCountdown); // se actualiza al cambiar la fecha
});