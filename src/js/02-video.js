import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
console.log(iframe);

const player = new Player(iframe);
console.log(player);

// todo Перезапис часу
player.on('timeupdate', function (timeData) {
    //todo Записую час у localstorage 
    localStorage.setItem('Актуальний часовий поінт', timeData.seconds);
});

// todo Отримую час із localstorage у змінну для зручності
let getPausedTime = localStorage.getItem('Актуальний часовий поінт');
console.log('Актуальний часовий поінт', getPausedTime);
// todo Встановлюю час на якому зупинилось відео коли користувач вернеться на сторінку
player.setCurrentTime(getPausedTime)


player.on('play', function () {
    console.log(`played the video! At ${localStorage.getItem('Актуальний часовий поінт')}`);
});
player.on('pause', function () {
    console.log(`paused the video! At ${localStorage.getItem('Актуальний часовий поінт')}`);
});