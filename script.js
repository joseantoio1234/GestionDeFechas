
document.addEventListener('DOMContentLoaded', function() {
    //crea contenedor principal
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    
    //titulo del ejercicio
    const title = document.createElement('h1');
    title.textContent = 'Cuenta Atras';
    container.appendChild(title);
    
    //descripcion del ejercico
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = 'Selecciona un evento para ver el tiempo que falta';
    container.appendChild(description);
    
    //selector de eventos
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'selector';
    container.appendChild(selectorContainer);
    
    const eventSelector = document.createElement('select');
    eventSelector.id = 'eventSelector';
    
    const options = [
        { value: 'navidad', text: 'Vacaciones de Navidad' },
        { value: 'examen', text: 'Primer Examen' },
        { value: 'cumpleaños', text: 'Mi Cumpleaños' }
    ];
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        eventSelector.appendChild(optionElement);
    });
    
    selectorContainer.appendChild(eventSelector);
    
    //titulo del evento
    const eventTitle = document.createElement('div');
    eventTitle.className = 'event-name';
    eventTitle.id = 'eventTitle';
    eventTitle.textContent = 'Vacaciones de Navidad';
    container.appendChild(eventTitle);
    
    //contenedor de cuenta regresiva
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown';
    countdownContainer.id = 'countdown';
    container.appendChild(countdownContainer);
    
    //tiempo 
    const timeUnits = [
        { id: 'months', label: 'Meses' },
        { id: 'days', label: 'Días' },
        { id: 'hours', label: 'Horas' },
        { id: 'minutes', label: 'Minutos' },
        { id: 'seconds', label: 'Segundos' }
    ];
    
    timeUnits.forEach(unit => {
        const timeUnit = document.createElement('div');
        timeUnit.className = 'time-unit';
        
        const number = document.createElement('div');
        number.className = 'number';
        number.id = unit.id;
        number.textContent = '0';
        
        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = unit.label;
        
        timeUnit.appendChild(number);
        timeUnit.appendChild(label);
        countdownContainer.appendChild(timeUnit);
    });
    
    //fechas del ejercicio
    const eventDates = {
        navidad: new Date(new Date().getFullYear(), 0, -11), //   vacaciones navidad
        examen: new Date(new Date().getFullYear(), 0, -20), //    primer examen
        cumpleaños: new Date(new Date().getFullYear(), 8, 6) //  cumpleaños
    };
    
    //opciones
    const eventNames = {
        navidad: "Vacaciones de Navidad",
        examen: "Examen de la Primera Evaluación",
        cumpleaños: "Mi Cumpleaños"
    };
    
    //funcion para actualizar el color del tiempo que quede
    function updateColor(daysLeft) {
        const timeUnits = document.querySelectorAll('.time-unit');
        
        //remover clases de color anteriores
        timeUnits.forEach(unit => {
            unit.classList.remove('color-green', 'color-orange', 'color-red');
        });
        
        //aplicar nuevo color segun el tiempo que quede
        if (daysLeft > 30) {
            //mas de un mes - Verde
            timeUnits.forEach(unit => {
                unit.classList.add('color-green');
            });
        } else if (daysLeft > 7) {
            //menos de un mes pero mas de una semana - Naranja
            timeUnits.forEach(unit => {
                unit.classList.add('color-orange');
            });
        } else {
            //menos de una semana - Rojo
            timeUnits.forEach(unit => {
                unit.classList.add('color-red');
            });
        }
    }
    
    //funcion para actualizar la cuenta regresiva
    function updateCountdown() {
        const selectedEvent = eventSelector.value;
        const now = new Date();
        let targetDate = new Date(eventDates[selectedEvent]);
        
        //si la fecha ya paso este año usar la del proximo año
        if (now > targetDate) {
            targetDate.setFullYear(targetDate.getFullYear() + 1);
        }
        
        //calcula la diferencia en milisegundos
        const diff = targetDate - now;
        
        //calcula meses, dias, horas, minutos y segundos
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        //calcula dias totales para el cambio de color
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        //actualiza los elementos HTML
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        //actualiza el titulo del evento
        eventTitle.textContent = eventNames[selectedEvent];
        
        //actualiza el color segun el tiempo restante
        updateColor(totalDays);
    }
    
    //actualiza la cuenta regresiva cada segundo
    setInterval(updateCountdown, 1000);
    
    //actualiza cuando se cambia el evento seleccionado
    eventSelector.addEventListener('change', updateCountdown);
    
    //inicializa la cuenta regresiva
    updateCountdown();
});