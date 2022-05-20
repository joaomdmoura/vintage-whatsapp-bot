import { startWhatsApp } from "./app/whatsapp";

class App {
  start(){
    startWhatsApp()
  }
}

new App().start();