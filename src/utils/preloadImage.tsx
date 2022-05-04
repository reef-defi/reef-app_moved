type CbFunction = (...args: any[]) => any;

export interface Arguments {
  url: string,
  callback?: CbFunction
}

const preloadImage = (url: string, callback: CbFunction): Arguments|undefined => {
  if (!url) return;

  const img = new Image();
  img.src = url;

  const complete = (): void => {
    if (callback) callback();
  };

  img.onload = () => {
    complete();
  };
};

export default preloadImage;
