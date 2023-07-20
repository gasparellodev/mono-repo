import dayjs, { Dayjs } from "dayjs";

export function formatCurrency(currency: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);
}

export function formatScheduleDate(date: Dayjs, time: string) {
  const message = `${date.format("dddd")} / ${time} às ${dayjs(
    `2010-10-10T${time}`
  )
    .add(1, "hour")
    .format("HH:mm")}`;

  return message.charAt(0).toUpperCase() + message.slice(1);
}

export function formatLongDate(date: Dayjs) {
  return date.format("DD MMMM YYYY");
}
