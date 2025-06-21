const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
} as Intl.DateTimeFormatOptions;

const dateOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;

export const dateFromISO = (dateString: string) => {
  const b = dateString.split(/\D+/);
  const offsetMult = dateString.indexOf('+') !== -1 ? -1 : 1;
  const hrOffset = offsetMult * (+b[7] || 0);
  const minOffset = offsetMult * (+b[8] || 0);
  return new Date(
    Date.UTC(
      +b[0],
      +b[1] - 1,
      +b[2],
      +b[3] + hrOffset,
      +b[4] + minOffset,
      +b[5],
      +b[6] || 0,
    ),
  );
};

export const ISOtoTime = (ISO: string) => {
  const date = dateFromISO(ISO);

  return jsDateToTime(date);
};

export const ISOToDate = (ISO: string) => {
  const date = dateFromISO(ISO);

  return jsDateToDate(date);
};

export const jsDateToTime = (date: Date) => {
  return date.toLocaleString(undefined, timeOptions);
};

export const jsDateToDate = (date: Date) => {
  return date.toLocaleString(undefined, dateOptions);
};

export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const createLabel = (value: string) =>
  value.toLowerCase().split('_').map(capitalize).join(' ');
