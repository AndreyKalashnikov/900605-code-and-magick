'use strict';

var renderStatistics = function (ctx, names, times) {

  var columnHeights = [];

  /*Облако*/
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  /*Текст*/
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 230, 30);
  ctx.fillText('Список результатов:', 220, 50);

  /*Имена*/
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], 155 + 90 * i, 270);
  };

  /*Столбцы*/
  /*Максимальное время*/
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    };
  };

  /*Высоты столбцов*/
  for (var i = 0; i < times.length; i++) {
    columnHeights[i] = Math.round(times[i] * (150 / maxTime));
  };

  /*Рисуем столбцы и их значения*/
  for (var i = 0; i < columnHeights.length; i++) {
    ctx.fillText(Math.round(times[i]), 155 + 90 * i, 230 - columnHeights[i]);
    ctx.fillRect(155 + 90 * i, 245 - columnHeights[i], 40, columnHeights[i]);
  };

};

window.renderStatistics = renderStatistics;

