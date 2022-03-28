export const pause = (time: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};
