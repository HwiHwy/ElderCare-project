import { format, parseISO } from 'date-fns'

export const parseDateStringToDate = (dateString) => {
  const date = parseISO(dateString)
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss')
  return formattedDate
}
