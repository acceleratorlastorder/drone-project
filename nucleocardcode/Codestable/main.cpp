#include "dronecontroller.hpp"
char tmp;
//char arrayFromESP[39] = { 0 };
char trash;
char buffer[10]= "";
short int s=0,j=0;

void rxmanager()
{
    tmp = esp8266.getc();
    if(tmp == '[' || tmp == '\0'|| tmp == '"') { //if we start the array or we're in the end we put that value in trash
        trash = tmp;
    } else {
        if(tmp==',') {
            j=0;
            /*
            buffer[0]= '0';
            buffer[9]= '0';*/
            if (s == 0) {
                roll = atof(buffer);
            }
            if  (s == 1) {
                pitch = atof(buffer);
            }
            if  (s == 2) {
                yaw = atof(buffer);
            }
             for(int k=0; k<9; k++) {
                 buffer[k]=0;
             }
             s++;
        } else {
            buffer[j] = tmp;
            j++;
             if (tmp == ']') {
                 throttle = atof(buffer);
             }
        }
    }
}

int main()
{
    pc.baud(115200);
    esp8266.baud(115200);

    //pc.printf("hello user :) \n");

    esp8266.attach(&rxmanager); // event starting the function rxmanager once there is a char received on the serial esp8266 and WILL RECALL THE FUNCTION AS A LOOP as long the buffer is not empty
    while (1) {
        pc.printf("roll: %f ,pitch: %f , yaw: %f, throttle: %f \n",roll, pitch, yaw, throttle);
        s=0,j=0;
        wait(0.05);

        throttlepercent = throttle*percent;
        pwmManager(roll, pitch, yaw, throttle);
        indicatorvalue();
    }

}
