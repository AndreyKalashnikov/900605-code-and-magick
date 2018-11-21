'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW = 10;
var CLOUD_RADIUS = 75;
var COLUMN_WIDTH = 40;
var COLUMN_INTERVAL = 50;
var COLUMN_MAX_HEIGHT = 150;
var GAP = 20;

/*
Прямоугольник с закругленными углами, начиная с левого верхнего угла по часовой стрелке
Ширина CLOUD_WIDTH
Высота CLOUD_HEIGHT
Левый верхний угол CLOUD_X  CLOUD_Y
Радиус скругления CLOUD_RADIUS
Отступ тени CLOUD_RADIUS
*/

/* x, y -левый верхний угол */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  var pi = Math.PI;
  var CLOUD_RADIUS_X = CLOUD_RADIUS + x;
  var CLOUD_COORDINATE_X = CLOUD_WIDTH + x;
  var CLOUD_RADIUS_Y = CLOUD_RADIUS + y;
  var CLOUD_COORDINATE_Y = CLOUD_HEIGHT + y;

  ctx.beginPath();
  ctx.arc(CLOUD_RADIUS_X, CLOUD_RADIUS_Y, CLOUD_RADIUS, pi, pi * 3 / 2);
  ctx.lineTo(CLOUD_COORDINATE_X - CLOUD_RADIUS, y);
  ctx.arc(CLOUD_COORDINATE_X - CLOUD_RADIUS, CLOUD_RADIUS_Y, CLOUD_RADIUS, pi * 3 / 2, pi * 2);
  ctx.lineTo(CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y - CLOUD_RADIUS);
  ctx.arc(CLOUD_COORDINATE_X - CLOUD_RADIUS, CLOUD_COORDINATE_Y - CLOUD_RADIUS, CLOUD_RADIUS, 0, pi / 2);
  ctx.lineTo(CLOUD_RADIUS_X, CLOUD_COORDINATE_Y);
  ctx.arc(CLOUD_RADIUS_X, CLOUD_COORDINATE_Y - CLOUD_RADIUS, CLOUD_RADIUS, pi / 2, pi);
  ctx.lineTo(x, CLOUD_RADIUS_Y);
  ctx.fill();
};

var getMaxNumber = function (numbers) {
  var maxNumber = numbers[0];
  for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxNumber) {
      maxNumber = numbers[i];
    }
  }
  return maxNumber;
};

var renderStatistics = function (ctx, names, times) {

  /* Тень и облако */
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW, CLOUD_Y + CLOUD_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255,255,255)');

  /* Текст */
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура, вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP * 2);

  var maxTime = getMaxNumber(times);

  ctx.textBaseline = 'hanging';

  var count = names.length; /* Количество столбцов */
  for (var i = 0; i < count; i++) {
    var color = 'rgb(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      color = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillStyle = color;

    var columnStartX = CLOUD_X + (CLOUD_WIDTH - count * COLUMN_WIDTH - (count - 1) * COLUMN_INTERVAL) / 2 + i * (COLUMN_WIDTH + COLUMN_INTERVAL);
    var columnHeight = Math.round(times[i] * (COLUMN_MAX_HEIGHT / maxTime));
    ctx.fillText(names[i], columnStartX + COLUMN_WIDTH / 2, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), columnStartX + COLUMN_WIDTH / 2, CLOUD_Y + CLOUD_HEIGHT - GAP * 2.5 - columnHeight);
    ctx.fillRect(columnStartX, CLOUD_Y + CLOUD_HEIGHT - GAP * 1.5 - columnHeight, COLUMN_WIDTH, columnHeight);
  }

};

window.renderStatistics = renderStatistics;

