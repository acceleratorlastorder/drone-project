#include "errorcode.hpp"
#include "dronecontroller.hpp"

Serial esp8266(PC_12, PD_2); // TX, RX
char tmp;
char test[37] = { 0 };
float testultime = 0.8415616717171971;
char trash;
int i = 0;
int lel;
float arf = 0;
int s=0;
int *pointer = NULL;
char buffer[8]= "";
float roll, pitch, yaw, throttle;

void rxmanager()
{
     //  0.498054,0.505897,0.501976,0.000015
    tmp = esp8266.getc();
    if(tmp == ']' || tmp == '[' || tmp == '\0') {
        i=0;
        trash = esp8266.getc();
    } else {
        test[i] = tmp;
        if(test[i]==',') {

            if (s == 0) {
                roll = atof(buffer);
            } else if  (s == 1) {
                pitch = atof(buffer);
            } else if  (s == 2) {
                pitch = atof(buffer);
            }
            memset(&buffer[0], 0, 8);
            s++;
        } else {
            buffer[i] = test[i];
        }
        i++;
    }
}
/*
void rxmanagerwithread()
{
    tmp = esp8266.read();
    if(tmp == ']' || tmp == '[') {
        i=0;
        trash = esp8266.read();
    } else {
        test[i] = tmp;
        i++;
    }
}

*/

int main(int argc, char *argv[])
{
    pc.baud(115200);
    esp8266.baud(115200);

    pc.printf("hello user :) \n");

    esp8266.attach(&rxmanager); // event starting the function rxmanager once there is a char received on the serial esp8266 and WILL RECALL THE FUNCTION AS A LOOP as long the buffer is not empty
    while (1) {
        pc.printf("testultime: %s and roll %f\n", test, roll);
        /*

                             xroll = a0.read();
                             ypitch = a1.read();
                             ythrottle = a2.read();

                             xrollpercent = xroll*percent;
                             ypitchpercent = ypitch*percent;
                             ythrottlepercent = ythrottle*percent;
        */
        /*
                                     b = pa7.read();

                                     xrollv = a0.read_u16();
                                     ypitchv = a1.read_u16();
                                     ythrottlev = a1.read_u16();
        */
        /*
                                     cout << "xroll: " << xroll << ", ypitch: " << ypitch << ", ythrottle: " << ythrottle << ", b: " << b << ", xroll voltage: " << xrollv << ", ypitch voltage: " << ypitchv << ",xroll percent: " << xrollpercent << ", ypitch percent: " << ypitchpercent << " bouton used ? " << waiting << endl;
                                     pwmManager(ypitch,xroll,ythrottle);
                                     indicatorvalue();
                             */
    }

}




void rxManager()
{
    tmp = esp8266.getc();
    if(!(tmp == '[' || tmp == '\0')) {
        if(tmp==']') {
            arrayFromESP[i]=tmp;
            if (s==3) {
            throttl = atof(buffer);
            }
            tmp = NULL;
            s=0;
            i=0;
        } else if(tmp==',') {
            i=0;
            if(s==0) {
                roll = atof(buffer);
            }if(s==1) {
                pitch = atof(buffer);
            }
            if(s==2) {
                yaw = atof(buffer);
            }else{
              s++;
            }
            memset (buffer,0,10);
        } else {
            buffer[i]=tmp;
        }
    }
    i++;

}
