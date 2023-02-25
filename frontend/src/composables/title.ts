const baseTitle = ' / Filmotéka'

export default function({
  title, includeBase = true
}: {
  title: string, includeBase?: boolean  
}) {
  document.title = `${title}${includeBase && baseTitle}`
}