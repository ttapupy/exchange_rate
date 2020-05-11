export default ( rates, {base, goal} ) => {
  if (base === '' || goal === '') {
    return rates
  } else {
    return rates.filter((rate) => {
      return (
        (rate.base === base && rate.goal === goal) || (rate.goal === base && rate.base === goal)
      );
    });
  }
};
