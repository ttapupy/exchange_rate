const compare = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}


export default ( rates, {base, goal} ) => {
  if (base === '' || goal === '') {
    return rates.sort(compare)
  } else {
    return rates.sort(compare).filter((rate) => {
      return (
        (rate.base === base && rate.goal === goal) || (rate.goal === base && rate.base === goal)
      );
    });
  }
};
