import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const formatDate = (
  date: string,
  format: string = "YYYY MMM, DD hh:mm a"
) => {
  return dayjs(date).local().format(format);
};
