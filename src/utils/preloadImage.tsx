export interface Arguments {
  url: string,
  callback?: (...args: any[]) => any
}

const preloadImage = (url, callback): Arguments => {
  if (!url) return

  let img = new Image()
  img.src = url

  const complete = () => {
    if (callback) callback()
  }

  img.onload = () => {
    complete()
  }
}

export default preloadImage