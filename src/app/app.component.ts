import { Component } from '@angular/core';
import { NgxSerial } from 'ngx-serial';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-serial-example';

  serial: NgxSerial;

  constructor() {
    this.serial = new NgxSerial(this.dataHandler);
  }

  dataHandler(data: string) {
    console.log("From arduino -> " + data);
  }

  connect() {
    this.serial.connect();
  }

  toggleL1() {
    this.serial.sendData(String.fromCharCode(76, 49, 10)); //L1/n
  }
  toggleL2() {
    this.serial.sendData(String.fromCharCode(76, 50, 10));//L2/n
  }

  close() {
    this.serial.close();
  }


}
