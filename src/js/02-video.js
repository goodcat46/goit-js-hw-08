import Player from '@vimeo/player';
var throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
// console.log(iframe);
// todo Ініціалізація
const player = new Player(iframe);

// todo Отримую час із localstorage у змінну для зручності
let getActualTimePoint = localStorage.getItem('videoplayer-current-time');
setVideoCurrentTime();
//  todo Виводжу у консолль час із котрого почався перегляд
player.on('play', function () {
  // todo Записую час у localstorage
  player.on(
    'timeupdate',
    throttle(timeData => {
      localStorage.setItem('videoplayer-current-time', timeData.seconds);
    }, 1000)
  );
  console.log(
    `played the video! At ${localStorage.getItem('videoplayer-current-time')}`
  );
  // todo Виводжу у консоль час на якому ПЕРЕРВАЛИ перегляд
  player.on('pause', function () {
    console.log(
      `paused the video! At ${localStorage.getItem('videoplayer-current-time')}`
    );
  });
});

function setVideoCurrentTime() {
  if (getActualTimePoint !== null) {
    // todo Встановлюю час на якому зупинилось відео коли користувач вернеться на сторінку
    player.setCurrentTime(getActualTimePoint);
    console.log('Поточний час відтворення відео', getActualTimePoint);
    return;
  }
  console.log(`ВІдео ще не переглядали`);
  localStorage.setItem('videoplayer-current-time', '0')
}
