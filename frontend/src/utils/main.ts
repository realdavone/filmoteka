export default {
  makeUnscrollable(element: HTMLElement, arg: any){ element.classList.toggle('modal-open', arg) },
  getTranslations<T extends { data: { overview: string } }>(translations: Array<T>, key: keyof T, codes: Array<string>): T{
    return translations
      .filter(translation => codes.includes(translation[key] as string))
      .filter(translation => translation.data.overview !== '')
      .sort((a, b) => a[key] === codes[0] ? -1 : b[key] === codes[0] ? 1 : 0)[0]
  },
  sortCreators<T>(creators: Array<any>): Array<T>{    
    let arr: any[] = []

    creators.forEach(creator => {
      let indexOfItem = arr.findIndex(element => element.id === creator.id)
      if(indexOfItem === -1) arr.push({
        id: creator['id'],
        name: creator['name'],
        jobs: [creator['job']],
        profile_path: creator['profile_path']
      })
      else arr[indexOfItem]['jobs'].push(creator['job'])
    })
    
    return arr
  },
  initLoader(){
    document.getElementById('app')!.innerHTML = ''
    
    const loaderHolder = document.createElement('section')
    const logo = document.createElement('div')
    const loader = document.createElement('div')

    logo.innerHTML = `
    <svg height="60" viewBox="0 0 410.3636363636363 115" class="css-1j8o68f">
    <g
      transform="matrix(1,0,0,1,0,0)"
      fill="var(--theme-color)"
    ><rect width="104" height="115" rx="8"></rect></g>
    <g
      transform="matrix(1.9397249843480202,0,0,1.9397249843480202,20.09097998900165,-16.56932675832502)"
      fill="white"
    ><path d="M0.66 16.560000000000002 c0.06 0 30.72 -0.42 30.9 -0.24 c0.78 0.72 1.2 8.4 1.2 17.1 c-2.52 -2.7 -7.02 -6.24 -13.68 -7.2 c-2.04 -0.48 -3.66 -0.3 -3.66 -0.3 c-1.14 0.12 -1.98 1.02 -1.86 2.16 c0.06 0.96 0.84 1.68 1.74 1.86 c0.18 0 0.42 0.06 0.66 0.06 c0.66 0 1.2 0.06 1.8 0.18 c2.34 0.6 5.76 3.06 4.2 12 c-4.32 -1.26 -7.62 -0.42 -8.34 0.66 c-1.44 2.04 -0.24 9.48 1.02 17.22 c-7.08 0 -13.74 -0.3 -14.16 -0.96 c-1.2 -2.16 0 -42.36 0.18 -42.54 z"></path></g>
    <g
      transform="matrix(1.5106753376278341,0,0,1.5106753376278341,120.37437832527783,18.29488608030022)"
      fill="var(--font-color)"
    ><path d="M20.12 17.32 l-11.72 0 l0 6.12 l9.64 0 l0 5 l-9.64 0 l0 11.56 l-6 0 l0 -28 l17.72 0 l0 5.32 z M29.32 11.719999999999999 l0 4.88 l-5.72 0 l0 -4.88 l5.72 0 z M29.32 19.2 l0 20.8 l-5.72 0 l0 -20.8 l5.72 0 z M39.199999999999996 11.719999999999999 l0 28.28 l-5.72 0 l0 -28.28 l5.72 0 z M70.6 18.88 c4.32 0 8.24 2.8 8.24 9.76 l0 11.36 l-5.72 0 l0 -11.24 c0 -2.88 -1.32 -4.88 -4.28 -4.88 c-2.68 0 -4.36 2.28 -4.88 4.4 l0 11.72 l-5.72 0 l0 -11.24 c0 -2.88 -1.8 -4.88 -4.28 -4.88 c-2.8 0 -4.44 2 -4.88 4.4 l0 11.72 l-5.72 0 l0 -20.8 l5.72 0 l0 4 c0.12 -1.08 2.16 -4.32 6.32 -4.32 c2.96 0 5.92 1.6 7.52 4.68 c0.56 -1.32 2.96 -4.68 7.68 -4.68 z M92.96000000000001 18.84 c4.72 0 10.88 3.56 10.88 10.84 s-6.16 10.72 -10.88 10.72 s-10.92 -3.44 -10.92 -10.72 s6.2 -10.84 10.92 -10.84 z M92.96000000000001 23.92 c-2.6 0 -5.36 1.96 -5.36 5.76 c0 3.68 2.76 5.64 5.36 5.64 c2.56 0 5.36 -1.96 5.36 -5.64 c0 -3.8 -2.8 -5.76 -5.36 -5.76 z M116.80000000000001 35.2 c1.08 0 1.88 -0.12 2.76 -0.44 l0 4.8 c-0.88 0.4 -2.24 0.68 -4.24 0.68 c-3.24 0 -5.96 -1.12 -5.96 -7 l0 -9.32 l-2.92 0 l0 -4.72 l2.92 0 l0 -4.88 l5.72 0 l0 4.88 l4.44 0 l0 4.72 l-4.44 0 l0 9.28 c0 0.96 0.28 2 1.72 2 z M140.08 12 l-5.16 5.16 l-4.36 0 l2.64 -5.16 l6.88 0 z M133.24 18.84 c4.72 0 11.24 3.56 10 12.76 l-15.12 0 c0.72 2.6 2.88 3.96 5.68 3.96 c2.6 0 3.6 -0.6 5.08 -1.4 l3.16 3.08 c-1.8 1.88 -4.36 3.16 -8.44 3.16 c-5.2 0 -11.28 -3.56 -11.28 -10.72 c0 -7.28 6.2 -10.84 10.92 -10.84 z M133.24 23.72 c-2.08 0 -4.28 1.28 -5.04 3.84 l10 0 c-0.64 -2.56 -2.92 -3.84 -4.96 -3.84 z M161.4 40 l-7.16 -8.32 l-1.64 1.72 l0 6.6 l-5.72 0 l0 -7.4 l0 -20.88 l5.72 0 l0 14.68 l6.68 -7.2 l6.84 0 l-8.36 8.76 l10.24 12.04 l-6.6 0 z M186.24 19.2 l5.72 0 l0 20.8 l-5.72 0 l0 -2.56 c-0.12 0.84 -2.16 2.96 -5.76 2.96 c-4.76 0 -10.28 -3.44 -10.28 -10.84 c0 -7.16 5.52 -10.72 10.28 -10.72 c3.6 0 5.64 2.24 5.76 2.68 l0 -2.32 z M181.28 35.32 c2.8 0 5.24 -1.92 5.24 -5.76 c0 -3.72 -2.44 -5.64 -5.24 -5.64 c-2.88 0 -5.52 1.96 -5.52 5.64 c0 3.8 2.64 5.76 5.52 5.76 z"></path></g>
  </svg>
    `

    loaderHolder.setAttribute('class', 'loader-holder')
    loaderHolder.appendChild(logo)
    loaderHolder.appendChild(loader)
    
    document.getElementById('app')!.appendChild(loaderHolder)
  },
  setFailedScreen(error: string, retry: () => void){
    document.getElementById('app')!.innerHTML = ''

    const loaderHolder = document.createElement('section')
    const text = document.createElement('span')
    const button = document.createElement('button')

    text.innerText = error
    button.innerText = 'Skúsiť znova'

    loaderHolder.setAttribute('class', 'failed-holder')
    loaderHolder.appendChild(text)

    button.onclick = () => retry()
    button.setAttribute('class', 'retry-app-button')
    
    document.getElementById('app')!.appendChild(loaderHolder).appendChild(button)
  }
}