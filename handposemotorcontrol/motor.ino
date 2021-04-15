int incommingByte;
void setup() {
  // put your setup code here, to run once:
  pinMode(2,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
   if(Serial.available()>0){
    incommingByte=Serial.read();
    analogWrite(2,int(incommingByte));
   }
}


