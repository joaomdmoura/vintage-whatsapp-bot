export default class TextHandler {
  content: string;

  constructor(content: string){
    this.content = content
  }

  handle (){
    console.log(this.content)
  }
}