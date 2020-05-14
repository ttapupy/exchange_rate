import { v4 as uuid } from 'uuid';

export const addRate = ({ id = uuid(), date = '', base = '', goal = '', rate = 0 } = {}) => {
  localStorage.setItem(id, JSON.stringify({id, date, base, goal, rate}))
  return (
    {
      type: 'ADD_RATE',
      rate: {
        id,
        date,
        base,
        goal,
        rate
      }
    }
  )

};

export const removeRate = ({ id }) => {
  localStorage.removeItem(id)
  return (
    {
      type: 'REMOVE_RATE',
      id
    })
};
