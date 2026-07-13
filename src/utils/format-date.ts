import dayjs from 'dayjs';

const DEFAULT_FORMAT = 'DD/MM/YYYY';

export function formatDate(value: string | Date, format = DEFAULT_FORMAT) {
  const date = dayjs(value);

  return date.isValid() ? date.format(format) : '—';
}
