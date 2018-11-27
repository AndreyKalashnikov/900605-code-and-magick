'use strict';

// var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
// var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
// var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var data = [{
  firstName: '!Иван',
  lastName: 'да Марья',
  coatColor: 'rgb(101, 137, 164)',
  eyesColor: 'black'
},
{
  firstName: '!Мария',
  lastName: 'Мирабелла',
  coatColor: 'rgb(241, 43, 107)',
  eyesColor: 'green'
},
{
  firstName: '!Вашингтон',
  lastName: 'Вальц',
  coatColor: 'rgb(146, 100, 161)',
  eyesColor: 'yellow'
},
{
  firstName: '!Кристоф',
  lastName: 'Топольницкая',
  coatColor: 'rgb(56, 159, 117)',
  eyesColor: 'blue'
},
{
  firstName: 'Иван',
  lastName: 'да Марья',
  coatColor: 'rgb(101, 137, 164)',
  eyesColor: 'black'
},
{
  firstName: 'Мария',
  lastName: 'Мирабелла',
  coatColor: 'rgb(241, 43, 107)',
  eyesColor: 'green'
},
{
  firstName: 'Вашингтон',
  lastName: 'Вальц',
  coatColor: 'rgb(146, 100, 161)',
  eyesColor: 'yellow'
},
{
  firstName: 'Кристоф',
  lastName: 'Топольницкая',
  coatColor: 'rgb(56, 159, 117)',
  eyesColor: 'blue'
}
];

// var getAll = function (array, count) {
//   var arrayData = [];
//   for (var i = 0; i < count; i++) {
//     arrayData.push(getByIndex(array, getRandomFromDiaposon(0, array.length - 1)));
//   }
//   return arrayData;
// };

var getByIndex = function (array, index) {
  if (typeof index === 'number' && index >= 0 && !(index % 1) && !(index === Infinity)) {
    return array[index];
  } else {
    // console.log('Bad data');
    return array[0];
  }
};

var getRandomFromDiaposon = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.firstName + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

var wizards = [];

for (var j = 0; j < 4; j++) {
  // wizards.push({
  //   name: NAMES[getRandomFromDiaposon(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomFromDiaposon(0, SURNAMES.length - 1)],
  //   coatColor: COAT_COLORS[getRandomFromDiaposon(0, COAT_COLORS.length - 1)],
  //   eyesColor: EYES_COLORS[getRandomFromDiaposon(0, EYES_COLORS.length - 1)]
  // });

  wizards[j] = getByIndex(data, getRandomFromDiaposon(0, data.length - 1));

  var newWizard = renderWizard(wizards[j]);
  fragment.appendChild(newWizard);
}

similarListElement.appendChild(fragment);
