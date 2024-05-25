// // cuando carga el documento
document.addEventListener('DOMContentLoaded', function() {

    // a todos los timeline-steps .timeline-content .inner-circle, cuando se de hover, ir al svg y ponerlo color blanco
    document.querySelectorAll('.timeline-steps .timeline-content .inner-circle').forEach(function(item) {
        item.addEventListener('mouseover', function() {
            item.querySelector('svg').style.fill = '#000';
            item.querySelector('svg').style.stroke = '#fff';
            item.querySelector('svg').style.strokeWidth = '2px';
        });

        // cuando se quite el hover, ir al svg y poner
        item.addEventListener('mouseout', function() {
            item.querySelector('svg').style.fill = '#fff';
            item.querySelector('svg').style.stroke = '#000';
            item.querySelector('svg').style.strokeWidth = '2px';
        });
    });

});