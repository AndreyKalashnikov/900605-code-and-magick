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

/*
Прямоугольник с закругленными углами, начиная с левого верхнего угла по часовой стрелке
Ширина CLOUD_WIDTH
Высота CLOUD_HEIGHT
Левый верхний угол CLOUD_X  CLOUD_Y
Радиус скругления CLOUD_RADIUS
Отступ тени CLOUD_RADIUS
*/

/* x, y -левый верхний угол */
var renderCloud = function (ctx, x ,y, color) {
  ctx.fillStyle = color;
  var pi = Math.PI;
  ctx.beginPath();
  ctx.arc(CLOUD_RADIUS + x, CLOUD_RADIUS + y, CLOUD_RADIUS, pi, pi * 3 / 2);
  ctx.lineTo(CLOUD_WIDTH - CLOUD_RADIUS + x, 0 + y);
  ctx.arc(CLOUD_WIDTH - CLOUD_RADIUS + x, CLOUD_RADIUS + y, CLOUD_RADIUS, pi * 3 / 2, pi * 2);
  ctx.lineTo(CLOUD_WIDTH + x, CLOUD_HEIGHT - CLOUD_RADIUS + y);
  ctx.arc(CLOUD_WIDTH - CLOUD_RADIUS + x, CLOUD_HEIGHT - CLOUD_RADIUS + y, CLOUD_RADIUS, 0, pi / 2);
  ctx.lineTo(CLOUD_RADIUS + x, CLOUD_HEIGHT + y);
  ctx.arc(CLOUD_RADIUS + x, CLOUD_HEIGHT - CLOUD_RADIUS + y, CLOUD_RADIUS, pi / 2, pi);
  ctx.lineTo(0 + x, CLOUD_RADIUS + y);
  ctx.fill();
};

var getMaxNumber = function (numbers) {
  var maxNumber = numbers[0];
  for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxNumber) {
      maxNumber = numbers[i];
    };
  };
  return maxNumber;
};

var renderStatistics = function (ctx, names, times) {

  var columnHeights = [];

  /*Тень и облако*/
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW, CLOUD_Y + CLOUD_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255,255,255)');

  /*Текст*/
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 230, 30); /* Текст отцентрирован для ширины облака 420 */
  ctx.fillText('Список результатов:', 220, 50);

  var maxTime = getMaxNumber(times);

  var count = names.length; /* Количество столбцов */
  for (var i = 0; i < count; i++) {
    var color = 'rgb(0, 0, 255, '+ Math.random() + ')';
    if (names[i] === 'Вы') {
      color = 'rgba(255, 0, 0, 1)';
    };
    ctx.fillStyle = color;

    var columnStartX = CLOUD_X + (CLOUD_WIDTH - count * COLUMN_WIDTH - (count - 1) * COLUMN_INTERVAL) / 2 + i * (COLUMN_WIDTH + COLUMN_INTERVAL);
    var columnHeight = Math.round(times[i] * (COLUMN_MAX_HEIGHT / maxTime));
    ctx.fillText(names[i], columnStartX, 270);
    ctx.fillText(Math.round(times[i]), columnStartX, 230 - columnHeight);
    ctx.fillRect(columnStartX, 245 - columnHeight, COLUMN_WIDTH, columnHeight);
  };



};

window.renderStatistics = renderStatistics;

