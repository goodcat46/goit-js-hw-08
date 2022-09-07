import Player from '@vimeo/player';
var throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
// console.log(iframe);
// todo Ініціалізація
const player = new Player(iframe);

// todo Отримую час із localstorage у змінну для зручності
let getActualTimePoint = localStorage.getItem('videoplayer-current-time');
// todo Записую час у localstorage
setVideoCurrentTime();
function setVideoCurrentTime() {
  if (getActualTimePoint !== null) {
    // todo Встановлюю час на якому зупинилось відео коли користувач вернеться на сторінку
    player.setCurrentTime(getActualTimePoint);
    console.log('videoplayer-current-time', getActualTimePoint);

    //  todo Виводжу у консолль час із котрого почався перегляд
    player.on('play', function () {
      console.log(
        `played the video! At ${localStorage.getItem(
          'videoplayer-current-time'
        )}`
      );
    });
    // todo Виводжу у консоль час на якому ПЕРЕРВАЛИ перегляд
    player.on('pause', function () {
      console.log(
        `paused the video! At ${localStorage.getItem(
          'videoplayer-current-time'
        )}`
      );
    });
    return;
  }
  console.log(`ВІдео ще не переглядали`);
}

// todo Перезапис часу
player.on(
  'timeupdate',
  throttle(timeData => {
    localStorage.setItem('videoplayer-current-time', timeData.seconds);
  }, 1000)
);