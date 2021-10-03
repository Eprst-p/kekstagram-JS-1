function getRandomPositiveNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b))); // находим минимальное значение из модулей a и b, округляем вверх
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b))); // находим максимальное значение из модулей a и b, округляем вниз
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;  //рандомное число от a до b включительно
}

//Реализация рандомайзера взята с MDN Web Docs. Не является криптологически стойким.

function checkCommentLength (commentLength, maxCommentLength) {
  return (commentLength <= maxCommentLength);
}

checkCommentLength(127, 250);

const NAMES = ['Ивашка', 'Наитемнейший', 'Броненосец', 'Серёга', 'Соловей', 'Мистер картофелина', 'Седовласый', 'Су-27', 'Водолаз', 'йцукен', 'Вася Пупыркин', 'Пёс', 'Кусок'
  , 'Опер-уполномоченный', 'Человек-молекула', 'Андрей', 'Король Севера', 'Снежок', 'Ахмед', 'Поликарп'];

const DESCRIPTION = ['все раскуплено, говорили они', 'пляж на небе', 'корабль не видит меня', 'вид спереди', 'Пейн я ног не чувствую', 'драндулет', 'завтрак чемпиона', 'сушнячок'
  , 'не дотянул до аэропорта' , 'двое против одного', 'пришествие', 'куда меня занесло', 'в заказе была шаверма', 'суши-кот', 'можно долго не мыть полы', 'переборщил с батутом'
  , 'лица счастья', 'дом построили вокруг машины', 'чтобы не пнуть кота', 'кто живет в этих кубиках?', 'евроремзачем я фоткаю своб еду?', 'улитка ползет по воде'
  , 'есть че по мелочи?', 'знак масонов', 'хотел ноги ополоснуть'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomElement = function(array) {
  return array[getRandomPositiveNumber(0, array.length-1)];
};

const createComment = () => {
  const createMessage = function (random) {
    let firstMessage = getRandomElement(MESSAGES);
    let secondMessage = () => {
      let newMessage = getRandomElement(MESSAGES);
      while (newMessage === firstMessage) { //проверка, чтобы сообщения не были одинаковыми.
        newMessage = getRandomElement(MESSAGES);
      };
      return newMessage;
    }
    if (random === 1) {return firstMessage;}
    if (random === 2) {return firstMessage + ' ' + secondMessage();} //корявый способ, но какой придумал
  };
  return {
    id: getRandomPositiveNumber(1,15000),   //id рандомное число от 1 до 15000 (сам выдумал, диапазон не указан)
    avatar: 'img/avatar-' + getRandomPositiveNumber(1,6) + '.svg',
    message: createMessage(getRandomPositiveNumber(1,2)),
    name: getRandomElement(NAMES),
  };
};


const photoArray = Array.from({length: 25});

const createPhoto = function (i) {
  return {
    id: i+1,
    url: 'photos/' + i + '.jpg',
    description: DESCRIPTION[i],
    likes: getRandomPositiveNumber(15,200),
    comments: Array.from({length: getRandomPositiveNumber(1,5)}, createComment) //количество комментов рандомно: 1-5 (сам выдумал)
  };
};

for (let i = 0; i < 25; i++) {
  photoArray[i] = createPhoto(i);
};

console.log(photoArray);
