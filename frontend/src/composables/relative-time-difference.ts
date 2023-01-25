export default function(date: string): string {
  const now = new Date()
  const then = new Date(date)

  const differenceInMillis = Number(now) - Number(then)

  if(differenceInMillis > 31622400000) 
    return new Intl.RelativeTimeFormat('sk', { style: 'long' }).format(-Math.floor((differenceInMillis / 1000 / 60 / 60 / 24 / 30 / 12)), 'year')

  if(differenceInMillis > 2635200000)
    return new Intl.RelativeTimeFormat('sk', { style: 'long' }).format(-Math.floor((differenceInMillis / 1000 / 60 / 60 / 24 / 30)), 'month')
 
  if(differenceInMillis > 87840000)
    return new Intl.RelativeTimeFormat('sk', { style: 'long' }).format(-Math.floor((differenceInMillis / 1000 / 60 / 60 / 24)), 'day')

  if(differenceInMillis > 3660000)
    return new Intl.RelativeTimeFormat('sk', { style: 'long' }).format(-Math.floor((differenceInMillis / 1000 / 60 / 60)), 'hour')

  if(differenceInMillis > 61000)
    return new Intl.RelativeTimeFormat('sk', { style: 'long' }).format(-Math.floor((differenceInMillis / 1000 / 60)), 'minute')

  return new Intl.RelativeTimeFormat('sk', { style: 'long' }).format(-Math.floor((differenceInMillis / 1000)), 'second')
}