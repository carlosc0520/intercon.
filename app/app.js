import translations from './idioma.json' assert { type: 'json' };

// // cuando carga el documento
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.timeline-steps .timeline-content .inner-circle').forEach(function (item) {
        item.addEventListener('mouseover', function () {
            item.querySelector('svg').style.fill = '#000';
            item.querySelector('svg').style.stroke = '#fff';
            item.querySelector('svg').style.strokeWidth = '2px';
        });

        item.addEventListener('mouseout', function () {
            item.querySelector('svg').style.fill = '#fff';
            item.querySelector('svg').style.stroke = '#000';
            item.querySelector('svg').style.strokeWidth = '2px';
        });
    });


    // ** MODO DARK ** //
    let mododark = document.getElementById('modo-dark');
    mododark.checked = localStorage.getItem('modo-dark') ? localStorage.getItem('modo-dark') === 'true' : true;

    mododark.addEventListener('click', function () {
        mappersDark(mododark.checked);
        localStorage.setItem('modo-dark', mododark.checked);
    });


    const mappersDark = (estado) => {
        let root = document.documentElement;
        root.style.setProperty('--primary', (estado) ? '#111827f2' : '#f5f5f5f2');
        root.style.setProperty('--text-nav', (estado) ? '#fff' : '#000');
    }


    mappersDark(
        localStorage.getItem('modo-dark') ? localStorage.getItem('modo-dark') === 'true' : 
        mododark?.checked ? 
        true : false
    )


    // ** MODO LENGUAJE ** //
    let idiomaEsp = document.getElementById('idioma-es');
    let idiomaEng = document.getElementById('idioma-en');


    const translate = (idioma) => {
        let imgBandera = document.getElementById('img-bandera');
        imgBandera.src = `./assets/${idioma}.svg`

        Object.keys(translations).forEach(function (key) {
            let item = translations[key];
            Object.keys(item).forEach(function (key2) {
                let element = document.querySelectorAll(`[data-translate="${key2}"]`);
                if (element) {
                    element.forEach(function (e) {
                        e.innerHTML = item[key2][idioma];
                    });
                }
            });
        });
    }


    idiomaEsp.addEventListener('click', function () {
        localStorage.setItem('idioma', 'es');
        translate('es')
    });

    idiomaEng.addEventListener('click', function () {
        localStorage.setItem('idioma', 'us');
        translate('us')
    });

    translate(localStorage.getItem('idioma') || 'es');
    const element = document.querySelector('.backRight');

    element.addEventListener('animationend', () => {
        try {
            const addFixedImage = document.querySelectorAll('.bg-fixed-image');
            addFixedImage.forEach(function (item) {
                item.style.backgroundImage = 'url("https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg")';
                item.style.backgroundRepeat = 'no-repeat';
                item.style.backgroundAttachment = 'fixed';
                item.style.backgroundSize = 'contain';
                item.style.backgroundPosition = 'center';
            });
    
            document.body.style.backgroundColor = 'transparent';
            
        } catch (error) {
            
        }

        
    });
});