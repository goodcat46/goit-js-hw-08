// * Імпорт модуля THROTTLE
var throttle = require('lodash.throttle');
// * Імпорт модуля від Олексія
import localstorageService from './localstorage';

// * Знаходжу елемент форми
const feedbackFormEl = document.querySelector('.feedback-form');
console.log(feedbackFormEl);
// * Змінна для збереження обжкта із даними з форми
let userData = {};

const fillFeedbackFormFields = () => {
  // * Змінна у якій зберігається інфа завантажена із LS (а саме userData у JSON форматі) уже розпарсена
  const feedbackFormDataFromLS = localstorageService.load('userData');
  // * Якщо у LS відсутня інфа яку вводили раніше то код який заповнює інфу виконаний не буде
  if (feedbackFormDataFromLS === undefined) {
    return;
  }
  // * Оновлюємо проміжну змінну userData даними які уже були у формі 
  userData = { ...feedbackFormDataFromLS };
  // * Використовуючи цикд FORIN ми перебираємо отриманий і розпарсений обєкт із данимии що були збережені у LS
  for (const prop in feedbackFormDataFromLS) {
    // * перевірка на власні властивості (масло масляне)
    if (feedbackFormDataFromLS.hasOwnProperty(prop)) {
      // * Через властивість ELEMENTS ми вписуємо у атрибут інпута VALUE відповідне значення із обєкта який зберігався у LS
      feedbackFormEl.elements[prop].value = feedbackFormDataFromLS[prop];
    }
  }
};

fillFeedbackFormFields();

const onFormFieldInput = event => {
  // * Деструктуризація
  const { target } = event;

  // Проміжні звіні
  const fieldName = target.name;
  const fieldValue = target.value;

  // * У userData буде створюватись нова властивість для кожного інпуту, де імя властивості це знвчення атрибуту NAME, а значення властивості це VALUE інпуту
  userData[fieldName] = fieldValue;

  // Збереження введених символів у LS
  localstorageService.save('userData', userData);
};

// * Відміна оновлення сторінки та її очищення після відпраавки, виведення у консоль обєкта із даними
const onFeedbackFormSubmit = event => {
  event.preventDefault();

  console.log(userData);
  // * З імпортованого мудулю викликається очистка LS
  localstorageService.remove('userData');
  feedbackFormEl.reset();
};

// * Навішуємо на форму відслідковування події INPUT, і виклик функції збереження даних у LS. сповільнене THROTLLE
feedbackFormEl.addEventListener('input', throttle(onFormFieldInput, 500));

// * Навішуємо на форму відслідковування події SUBMIT, і виклик функції яка очищує LS та Форму, також виводить у консоль обєкт із даними отриманими через форму
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
