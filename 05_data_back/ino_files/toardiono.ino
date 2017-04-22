// LED vars 
const int ledPin = 13;


// LED read vars
String inputString = "";         // a string to hold incoming data
boolean toggleComplete = false;  // whether the string is complete


void setup() {
  // initialize serial:
  Serial.begin(9600);
  // init LEDS
  pinMode(ledPin,OUTPUT);

  digitalWrite(ledPin,0);

}

void loop() {
   // Recieve data from Node and write it to a String
   while (Serial.available() && toggleComplete == false) {
    char inChar = (char)Serial.read();
    if(inChar == 'T'){ // end character for led
     toggleComplete = true;
    }
    else{
      inputString += inChar; 
    }
  }
  // Toggle LED 13
  if(!Serial.available() && toggleComplete == true)
  {
    // convert String to int. 
    int recievedVal = stringToInt();
    
    if(recievedVal == 0)
    {
      digitalWrite(ledPin,recievedVal);
    }
    else if(recievedVal == 1)
    {
      digitalWrite(ledPin,recievedVal);
    }    
    toggleComplete = false;
  }
}
  

int stringToInt()
{
    char charHolder[inputString.length()+1];
    inputString.toCharArray(charHolder,inputString.length()+1);
    inputString = "";
    int _recievedVal = atoi(charHolder);
    return _recievedVal;
}

