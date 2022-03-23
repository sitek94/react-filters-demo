import * as fns from 'date-fns'

export function format(...args: Parameters<typeof fns.format>) {
  const [date, formatStr = '', options] = args

  return fns.format(date, formatStr, options)
}
