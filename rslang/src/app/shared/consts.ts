import { StatisticsModel } from '../dictionary/services/models';
export const BASE_URL = 'https://lisalisa6428-lang-app.herokuapp.com/';
export const WORDS_PER_PAGE = 20;

export const emptyUserStatistics: StatisticsModel = {
  learnedWords: 0,
  optional: {
    games: {
      sprint: [
        {
          date: new Date().toLocaleDateString('ru-RU').split('.').join('-'),
          wrong: 0,
          right: 0,
        },
      ],
      audioCall: [
        {
          date: new Date().toLocaleDateString('ru-RU').split('.').join('-'),
          wrong: 0,
          right: 0,
        },
      ],
    },
  },
};
