document.addEventListener('DOMContentLoaded', async function () {
    let translations = {};

    await fetch('./app/idioma.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            translations = data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

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
    let to_qr = document.getElementById('to_qr');

    mododark.checked = localStorage.getItem('modo-dark') ? localStorage.getItem('modo-dark') === 'true' : true;

    mododark.addEventListener('click', function () {
        mappersDark(mododark.checked);
        localStorage.setItem('modo-dark', mododark.checked);
    });


    const mappersDark = (estado) => {
        let root = document.documentElement;
        root.style.setProperty('--primary', (estado) ? '#111827f2' : '#e9e9e9f2');
        root.style.setProperty('--text-nav', (estado) ? '#fff' : '#000');
        root.style.setProperty('--p-gray', (estado) ? '#9ca3aff2' : '#7c7c7cf2');

        if (to_qr) {
            to_qr.src = (estado) ? './assets/qr_code_blanco.svg' : './assets/qr_code.svg';
        }
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