'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// var getAll = function (array, count) {
//   var arrayData = [];
//   for (var i = 0; i < count; i++) {
//     arrayData.push(getByIndex(array, getRandomFromDiaposon(0, array.length - 1)));
//   }
//   return arrayData;
// };

var getByIndex = function (array, index) {
  if (typeof index === 'number' && index >= 0 && !(index % 1)) {
    return array[index];
  } else {
    // console.log('Bad data');
    return array[0];
  }
};

var getRandomFromDiaposon = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');

setupSimilar.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupExit = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    setup.classList.add('hidden');
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupExit);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupExit);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var submitButton = setup.querySelector('.setup-submit');

var submitForm = function () {
  var form = setup.querySelector('form');
  form.submit();
};

submitButton.addEventListener('click', function () {
  submitForm();
});

submitButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    submitForm();
  }
});

var setupWizard = setup.querySelector('.setup-wizard');

var setColorFromArray = function (colorArray) {
  var color = getByIndex(colorArray, getRandomFromDiaposon(0, colorArray.length - 1));
  return color;
};

// Попытка обобщить три блока кожа ниже в один
// var setupElementColor = function (elementClass, elementArray) {
//   var setupElement = setupWizard.querySelector(elementClass);
//   setupElement.addEventListner('click', function () {
//     var newColor = getByIndex(elementArray, getRandomFromDiaposon(0, elementArray.length - 1));
//     setupElement.style.fill = newColor;

//   });
// };

var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
setupWizardCoat.addEventListener('click', function () {
  var newColor = setColorFromArray(COAT_COLORS);
  setupWizardCoat.style.fill = newColor;
  document.querySelector('[name="coat-color"]').value = newColor;
});

var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
setupWizardEyes.addEventListener('click', function () {
  var newColor = setColorFromArray(EYES_COLORS);
  setupWizardEyes.style.fill = newColor;
  document.querySelector('[name="eyes-color"]').value = newColor;
});

var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
setupWizardFireball.addEventListener('click', function () {
  var newColor = setColorFromArray(FIREBALL_COLORS);
  setupWizardFireball.style.background = newColor;
  document.querySelector('[name="fireball-color"]').value = newColor;
});

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

var wizards = [];

for (var j = 0; j < 4; j++) {
  wizards.push({
    name: getByIndex(NAMES, getRandomFromDiaposon(0, NAMES.length - 1)) + ' ' + getByIndex(SURNAMES, getRandomFromDiaposon(0, SURNAMES.length - 1)),
    coatColor: getByIndex(COAT_COLORS, getRandomFromDiaposon(0, COAT_COLORS.length - 1)),
    eyesColor: getByIndex(EYES_COLORS, getRandomFromDiaposon(0, EYES_COLORS.length - 1))
  });

  var newWizard = renderWizard(wizards[j]);
  fragment.appendChild(newWizard);
}

var similarListElement = setupSimilar.querySelector('.setup-similar-list');
similarListElement.appendChild(fragment);
