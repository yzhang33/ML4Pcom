#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int incommingByte;
int up=0;
int down=0;
void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  if(Serial.available()>0){
    incommingByte=Serial.read();
    if(incommingByte == 1){
      if(!up){
         for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
          // in steps of 1 degree
          myservo.write(pos);// tell servo to go to position in variable 'pos'
          if(pos == 180){
            up = 1;
          }
          delay(15);                       // waits 15ms for the servo to reach the position
        }
      }
      if(down == 1 && up == 1){
        down = 0;
      }
    }
    if(incommingByte == 2){
      if(!down){
        for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
          myservo.write(pos);              // tell servo to go to position in variable 'pos'
          if(pos == 0){
             down = 1;
          }
          delay(15);                       // waits 15ms for the servo to reach the position
       }
      }
      if(down == 1 && up == 1){
        up = 0;
      }
    }
  }
  
 
}