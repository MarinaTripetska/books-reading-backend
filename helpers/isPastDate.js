function isPastDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid argument: you must provide a "date" instance');
  }

  const pastTime = new Date();
  pastTime.setMinutes(pastTime.getMinutes() - 1);

  return date.getTime() <= pastTime.getTime();
}

module.exports = isPastDate;
