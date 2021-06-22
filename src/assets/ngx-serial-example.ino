/*
  Toggle LED's from browser using ngx-serial npm package

  This program can accept 2 commands through Serial port, L1 and L2.
  Both commands toggle a LED on pin 10 and pin 11 respectively.

  Created 21/06/21
  By Alejandro Rioja

  License: MIT
*/

const int bufferSize = 256;
char inputBuffer[bufferSize];
int bufferPointer = 0;

int incomingByte = 0;    // for incoming serial data

void setup() {
  Serial.begin(9600);    // opens serial port, sets data rate to 9600 bps

  //sets pin 10 and 11 as output
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);

  //initialize pin output to 0V
  digitalWrite(10, false);
  digitalWrite(11, false);
}

void loop() {

  if (Serial.available() > 0) { //character available

    // read the incoming byte:
    incomingByte = Serial.read();

    if (incomingByte == 10) { // if LF received its the end of the string transmission

      inputBuffer[bufferPointer++] = '\0';   // we add the string end character

      if (strcmp(inputBuffer, "L1") == 0) {
        digitalWrite(10, !digitalRead(10)); // toggle PIN 10
        Serial.println("Toggled L1\n");
      } else if (strcmp(inputBuffer, "L2") == 0) {
        digitalWrite(11, !digitalRead(11)); // toggle PIN 11
        Serial.println("Toggled L2\n");

      }

      bufferPointer = 0; // Buffer initialization

    } else if (bufferPointer < bufferSize - 1) { // Leave room for a null terminator
      inputBuffer[bufferPointer++] = incomingByte;
    }

  }

}
