#include "errorcode.hpp"
#include "dronecontroller.hpp"

Serial esp8266(PC_12, PD_2); // TX, RX
//int messageforthearduino;
// double delay,waittime;
char lol[100] = "";
char test[100] = "";
float testultime;
int i;
void rxmanager()
{
    test[i] = esp8266.getc();
    i++;
}



int main()
{
    pc.baud(115200);
    esp8266.baud(115200);

    pc.printf("pour le pc :) \n");
    
    /*
        esp8266.printf("Hello World\n");
        cout << "write something for the esp8266 :)" << endl;
        cin >> messageforthearduino;
        esp8266.printf("bon je t'ai ecrit une lettre :) %d \n", messageforthearduino);
        cout << "hello ! "<< endl;
        cout << "hello ! "<< endl;
        cout << "please set a value for the percentage" << endl;
        cin >> lol;
        percent = 100;
        cout << "checking the value is : " << percent << endl;
        cout <<  "adding the f to that value now we have: " << percent << endl;
        delay = 1.000;
    */

    esp8266.attach(&rxmanager); // event starting the function rxmanager once there is a char received on the serial esp8266 and WILL RECALL THE FUNCTION AS A LOOP as long the buffer is not empty

    while (1) {

        pc.printf("en attente d'un message \n");
        cout << "testultime: " << test << endl;
        wait(0.5);


        //   pc.printf("%c\n", arduino.getc());
        // cout << arduino.getc() << endl;

        /*
                cout << "écris un truck a envoye a l'esp" << endl;
                cin >> lol;
        */


/*
    
                     xroll = a0.read();
                     ypitch = a1.read();
                     ythrottle = a2.read();

                     xrollpercent = xroll*percent;
                     ypitchpercent = ypitch*percent;
                     ythrottlepercent = ythrottle*percent;

                     b = pa7.read();

                     xrollv = a0.read_u16();
                     ypitchv = a1.read_u16();
                     ythrottlev = a1.read_u16();

                     cout << "xroll: " << xroll << ", ypitch: " << ypitch << ", ythrottle: " << ythrottle << ", b: " << b << ", xroll voltage: " << xrollv << ", ypitch voltage: " << ypitchv << ",xroll percent: " << xrollpercent << ", ypitch percent: " << ypitchpercent << " bouton used ? " << waiting << endl;
                     pwmtest(ypitch,xroll,ythrottle);
                     indicatorandwaitingvalue();
             */
    }

}
