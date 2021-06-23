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
  port:any;

  constructor() {
    this.serial = new NgxSerial(this.dataHandler);
  }

  dataHandler(data: string) {
    console.log("From arduino -> " + data);
  }

  connect() {
    if(!this.port){
    this.serial.connect((port:any)=>{
      this.port = port;
    });
  }
  }

  toggleL1() {
    if(this.port)
      this.serial.sendData("L1\n"); //L1\n
  }
  toggleL2() {
    if(this.port)
      this.serial.sendData("L2\n");//L2\n
  }

  close() {
    if(this.port)
      this.serial.close((port:any)=>{
        this.port = port;

    });
  }
}