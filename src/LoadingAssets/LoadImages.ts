let instance:ImageLibrary|null = null;

interface ImageLibraryObj{
  [key:string]: HTMLImageElement|any;
}

export default class ImageLibrary{
  library:ImageLibraryObj
  constructor(){
    this.library = {}
    if(instance){return instance}
    else{instance = this;}
  }
  async loadImage(key:string, url:string){
    const image = await this.#prepareImage(url);
    this.library[key] = image;
  }

  async #prepareImage(url:string){
    // setup image and it's url
    const image = document.createElement('img');
    image.src = url;
    return new Promise((resolve)=>{
      image.onload = ()=>{resolve(image)}
    })
  }
}