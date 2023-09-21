import moment from "moment";

export const formatDateTime = (dateTime) => {
  return moment(dateTime).format("DD MMM YYYY HH:mm:ss");
};
