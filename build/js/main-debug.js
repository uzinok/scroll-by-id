window.onload = function () {
    let arrlinks = document.querySelectorAll('.scroll-js');

    for (let i = 0; i < arrlinks.length; i++) {

        arrlinks[i].addEventListener('click', function (e) {
            
            scrollMenu(this.getAttribute('href'));
        })

    }
};



// функция скролла
function scrollMenu(blockId) {
    let temp;

    // отмена анимации
    cancelAnimationFrame(temp);

    // время начала анимации
    var start = performance.now();

    // высота скролла страницы
    var from = window.pageYOffset || document.documentElement.scrollTop,
        // высота от верхнего края окна браузера до блока
        to = document.querySelector(blockId).getBoundingClientRect().top - 33;

    // время анимации из расчета 3000px за секунду
    duration = 1000 * Math.abs(to) / 300;

    // анимация скролла
    requestAnimationFrame(function step(timestamp, e) {
        // timestamp метка времени от начала анимации
        // сколько прошло времени (timestamp - start)
        // (timestamp - start) / duration приравниваем к 1
        var progress = (timestamp - start) / duration;
        1 <= progress && (progress = 1);
        // from + to расстояние от верха документа до верха блока
        // from + to * progress промежуточное расстояние до блока. progress == 1 мы на месте
        // изменение высоты скролла
        window.scrollTo(0, from + to * progress | 0);

        // остановка анимации
        // 1 > progress анимация продолжается или
        // задаем hash 

        (1 > progress) ? temp = requestAnimationFrame(step): (document.location.hash = blockId);

        // отменяем прокрутку если крутим колесом мышки
        document.addEventListener("wheel", function () {
            cancelAnimationFrame(temp);
        })
    })
}