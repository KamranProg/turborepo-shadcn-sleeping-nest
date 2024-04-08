import dayjs, { Dayjs } from "dayjs";

// Formats /////////////////////////
export const dateTimeFormat = (
  date?: string,
  format: string = "YYYY-MM-DD",
) => {
  if (!date) return date;
  return dayjs(date).format(format);
};

export const formatDateTimeStamp = (date: Dayjs | string | null): string => {
  if (!date) return ""; // Handle cases when the date is null or undefined
  return dayjs(date).format("DD/MM/YYYY [at] hh:mm A");
};

export const formatDate = (date: Dayjs | string | null): string => {
  if (!date) return "-"; // Handle cases when the date is null or undefined
  return dayjs(date).format("DD/MM/YYYY");
};
