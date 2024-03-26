const sounds = {
  blue: './sounds/blue.mp3',
  green: './sounds/green.mp3',
  red: './sounds/red.mp3',
  yellow: './sounds/yellow.mp3',
  wrong: './sounds/wrong.mp3',
}
const levels = [1, 5, 10, 15, 20, 25];
let saveSteps = [];
let saveClicks = [];
let currentLevel = 1;

const s = Snap('#svg');
const corner = s.path('M200 50L100 0H200V50Z');
const mask = s.path('M200 50L100 1H200V50Z');
const I = s.path('M144 35V31H152V35H144ZM136 59V55H144V43H140V39H152V55H160V59H136Z');
const iBorder = s.rect(120, 20, 52, 52, 9.5);
const iconInfo = s.g(iBorder, I);
const fold = s.path('M200 50L100 1L165 90L200 50Z');
I.addClass('info-i');
iBorder.addClass('info-border');
iconInfo.addClass('icon-info');
fold.attr({
  fill: 'blue',
});
corner.attr({
  fill: 'white',
})
mask.attr({
  fill: 'white',
})

iconInfo.attr({
  mask: mask
})

iconInfo.mouseover(() => $('.corner').addClass('visible-icon'));
iconInfo.mouseout(() => $('.corner').removeClass('visible-icon'));

s.mouseover(() => {
  fold.animate({ transform: 'matrix(1.8,0,0,1.8,-162,0)' }, 150);
  corner.animate({ transform: 'matrix(1.85,0,0,1.85,-166.5,0)' }, 150);
  mask.animate({ transform: 'matrix(1.85,0,0,1.85,-166.5,0)' }, 150);
  iconInfo.click(showInfo);
});

s.mouseout(() => {
  fold.animate({ transform: 'matrix(1,0,0,1, 0,0)' }, 150);
  corner.animate({ transform: 'matrix(1,0,0,1, 0,0)' }, 150);
  mask.animate({ transform: 'matrix(1,0,0,1, 0,0)' }, 150);
});

$(document).one('keypress', start);
$('.start').on('click', start);

function start() {

  removeCorner();
  defineLevel();

  $('.btn').on('click', function (event) {
    if (!event.isTrigger) saveClicks.push(this.id);
    makeSound(this.id);
    btnAnimation(this);

    for (let i = 0; i < saveClicks.length; i++) {

      if (saveClicks[i] !== saveSteps[i]) {
        gameOver();
        break;
      }

      if (i === saveClicks.length - 1 && saveClicks.length === saveSteps.length) {
        saveClicks = [];
        defineLevel();
        setTimeout(() => makeTask(), 500);
      }
    }
  })

  setTimeout(() => makeTask(), 1000);

}

function removeCorner() {
  $('.wrapper').removeClass('wrapper-start');
  $('.corner').html('');
}



function showInfo() {
  $('.corner').before(`
    <div class='info'> 
      <h2>Game info</h2>
      <div class="info-wrapper">
        <p><span class='color'>Get ready to watch, remember, repeat!</span></p>
        <p>The Simon game is the exciting game of lights and sounds 
        in which players <span class='color'>must repeat random sequences of lights 
        by pressing the colored pads in the correct order.</span> </p>
        <p>It's fast-paced play, with lights and sounds that can challenge you. </p>
        <p>Experience the fun as you repeat the patterns and advance to higher levels.
        <span class='color'>Try to beat your own high score.</span> </p>
        </div>
      <button class="close">close</button>
    </div>    
  `)
  $('.close').on('click', function () {
    $('.info').remove();

  })
}

function defineLevel() {
  const checkLevel = levels.indexOf(saveSteps.length) + 1;
  currentLevel = checkLevel > currentLevel ? checkLevel : currentLevel;
  $('#level-title').text('Level ' + currentLevel);
}

function makeTask() {
  const nextStep = nextColor();
  $('#' + nextStep).trigger('click');
  saveSteps.push(nextStep);
}

function makeSound(cmd) {
  const sound = new Audio(sounds[cmd]);
  sound.volume = 0.1;
  sound.play();
  
}

function btnAnimation(el) {
  $(el).addClass('pressed');
  setTimeout(() => { $(el).removeClass('pressed') }, 300);
}

function nextColor() {
  const colors = ['green', 'red', 'yellow', 'blue'];
  const random = Math.floor(Math.random() * 4);
  return colors[random];
}

function gameOver() {
  $('.wrapper').addClass('game-over');
  makeSound('wrong');
  const results = getStorageResults();
  results.push(currentLevel);
  setStorageResults(results);
  setTimeout(() => getResultsPage(results), 1000);
}

function getResultsPage(results) {
  $('body').html('');
  $('body').html(`
    <div class='wrapper'>
      <table>
      <caption>Your results</caption>
        <thead>
          <tr><th>Attempt</th><th>Achieved level</th></tr>
        </thead>
        <tbody>        
        </tbody>
      </table>
    </div>
  `);
  results.forEach((res, i) => {
    $('tbody').append(`<tr><td>${i + 1}</td><td>${res}</td></tr>`)
  })
  $('.wrapper').append(`<button class='new-game'>new game</button>`)
  $('.new-game').on('click', () => location.reload())
}

function setStorageResults(results) {
  sessionStorage.setItem('results', JSON.stringify(results));
}

function getStorageResults() {
  return JSON.parse(sessionStorage.getItem('results')) || [];
}