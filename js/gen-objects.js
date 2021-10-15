import {getRandomPositiveNumber} from './utilities.js';

const COMMENTATORS_NAMES = ['Ивашка', 'Наитемнейший', 'Броненосец', 'Серёга', 'Соловей', 'Мистер картофелина', 'Седовласый', 'Су-27', 'Водолаз', 'йцукен', 'Вася Пупыркин', 'Пёс', 'Кусок'
  , 'Опер-уполномоченный', 'Человек-молекула', 'Андрей', 'Король Севера', 'Снежок', 'Ахмед', 'Поликарп'];

const PHOTO_DESCRIPTIONS = ['все раскуплено, говорили они', 'пляж на небе', 'корабль не видит меня', 'вид спереди', 'Пейн я ног не чувствую', 'драндулет', 'завтрак чемпиона', 'сушнячок'
  , 'не дотянул до аэропорта' , 'двое против одного', 'пришествие', 'куда меня занесло', 'в заказе была шаверма', 'суши-кот', 'можно долго не мыть полы', 'переборщил с батутом'
  , 'лица счастья', 'дом построили вокруг машины', 'чтобы не пнуть кота', 'кто живет в этих кубиках?', 'евроремзачем я фоткаю своб еду?', 'улитка ползет по воде'
  , 'есть че по мелочи?', 'знак масонов', 'хотел ноги ополоснуть'];

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomElement = function(array) {
  return array[getRandomPositiveNumber(0, array.length-1)];
};

const usedIDies = [];//массив для записи уже использованных ID

const createComment = () => {
  const createMessage = function (random) {
    const firstMessage = getRandomElement(COMMENT_MESSAGE);
    const createSecondMessage = () => {
      let secondMessage = getRandomElement(COMMENT_MESSAGE);
      while (secondMessage === firstMessage) { //проверка, чтобы сообщения не были одинаковыми.
        secondMessage = getRandomElement(COMMENT_MESSAGE);
      }
      return secondMessage;
    };
    if (random === 1) {return firstMessage;}
    if (random === 2) {return `${firstMessage  } ${  createSecondMessage()}`;} //корявый способ, но какой придумал
  };

  const generateCommentID = () => {
    let uniqueID = getRandomPositiveNumber(1,15000);//id рандомное число от 1 до 15000 + плюс проверка на повторы
    while (usedIDies.includes(uniqueID)) {
      uniqueID = getRandomPositiveNumber(1,15000);
    }
    usedIDies.push(uniqueID);
    return uniqueID;
  };

  return {
    id: generateCommentID(),
    avatar: `img/avatar-${  getRandomPositiveNumber(1,6)  }.svg`,
    message: createMessage(getRandomPositiveNumber(1,2)),
    name: getRandomElement(COMMENTATORS_NAMES),
  };
};


const photoObjects = Array.from({length: 25});

const createPhoto = function (index) {
  return {
    id: index+1,
    url: `photos/${  index + 1  }.jpg`,
    description: PHOTO_DESCRIPTIONS[index],
    likes: getRandomPositiveNumber(15,200),
    comments: Array.from({length: getRandomPositiveNumber(1,5)}, createComment), //количество комментов рандомно: 1-5 (сам выдумал)
  };
};

for (let i = 0; i < 25; i++) {
  photoObjects[i] = createPhoto(i);
}

export {photoObjects, usedIDies};
