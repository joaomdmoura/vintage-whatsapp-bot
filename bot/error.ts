export default class Error {
  error: string;

  constructor(error: string){
    this.error = error
  }

  log() {
    console.log(this.error)
  }
}