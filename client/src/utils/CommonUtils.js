import dateFormat from 'dateformat';

export const dateTimeFromTS = (timestamp) => {
  let date = new Date();
  date.setTime(timestamp);
  return dateFormat(date);
}

export const scrollToDown = (el) => {
  el.scrollTop = el.scrollTop < 1 ? 2 : el.scrollTop * 2;

  if (el.scrollTop + 2 < el.scrollHeight - el.clientHeight) {
    setTimeout(() => { scrollToDown(el) }, 10);
  }
}
