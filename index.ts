import { startWhatsApp } from "./bot/whatsapp";

class App {
  start(){
    startWhatsApp()
  }
}

new App().start();