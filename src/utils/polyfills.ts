// padStart 函数
export const padStart = (
  current: string,
  targetLength: number,
  padString: string
) => {
  targetLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
  padString = String(typeof padString !== "undefined" ? padString : " ");
  if (current.length >= targetLength) {
    return String(current);
  } else {
    targetLength = targetLength - current.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(current);
  }
};
