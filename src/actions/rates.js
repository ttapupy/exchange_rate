import { v4 as uuid } from 'uuid';

export const addRate = ({ date = '', base = '', goal = '', rate = 0 } = {}) => ({
  type: 'ADD_RATE',
  rate: {
    id: uuid(),
    date,
    base,
    goal,
    rate
  }
});

export const removeRate = ({ id }) => (
  {
    type: 'REMOVE_RATE',
    id
  });
