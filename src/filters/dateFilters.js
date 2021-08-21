import moment from 'moment';

export default function formattedDate(value, dateFormatType = 'DD/MM/YYYY') {
  return value ? moment(value).format(dateFormatType) : '[Invalid format]';
}
