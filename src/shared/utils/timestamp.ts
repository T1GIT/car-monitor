import moment from 'moment/moment'

export function convertTimestamp(timestamp: number): Date {
  return moment.unix(timestamp).toDate()
}
