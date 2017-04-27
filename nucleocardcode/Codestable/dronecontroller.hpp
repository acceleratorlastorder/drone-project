//#include <iostream>
#include "mbed.h"

/*************SERIAL********************/

Serial pc(USBTX, USBRX); // tx, rx
RawSerial esp8266(PC_12, PD_2); // TX, RX

/********* ANALOG IN ************/
/*
AnalogIn a0(A0);
AnalogIn a1(A1);
AnalogIn a2(A2);
*/
/********* PMW OUT ************/

PwmOut pb13(PB_13);
PwmOut pa15(PA_15);
PwmOut pc7(PC_7);
PwmOut pb5(PB_5);
/********** DIGITAL IN ***********/
DigitalIn  button(USER_BUTTON);

/*********** DIGITAL OUT ***********/
DigitalOut myled1(LED1);
DigitalOut myled2(LED2);
DigitalOut myled3(LED3);


/*
using namespace std;
using std::string;
*/

float throttlepercent, pitchrcf, rollrcf, throttlercf, yawrcf, raport, roll, pitch, yaw, throttle;
unsigned short int percent = 100;

void indicatorvalue()
{
    if (throttlepercent > 33) {
        myled1 = 1;

    } else {
        myled1 = 0;
    }
    if (throttlepercent > 49) {
        myled2 = 1;

    } else {
        myled2 = 0;
    }
    if (throttlepercent > 95) {
        myled3 = 1;

    } else {
        myled3 = 0;
    }
}


void pwmManager(float rollRaw,float pitchRaw,float yawRaw,float throttleRaw)
{
    raport = 0.05f;
    pitchrcf = ((pitchRaw/100)*2)+raport;
    rollrcf = ((rollRaw/100)*2)+raport;
    throttlercf = ((throttleRaw/100)*2)+raport;
    yawrcf = ((yawRaw/100)*2)+raport;


    //std::cout << " y pitch raport cyclique flotant (RCF): " << ypitchrcf << " x roll raport cyclique flotant (RCF): " << xrollrcf << " y throttle raport cyclique flotant(RCF): " << ythrottle << " period: " << cycle << " multiplicator: " << multiplicator << " calcule (raport + ythrottlercf)/multiplicator " << (raport + ythrottlercf)/multiplicator << endl;
 //    pc.printf("rollrcf: %f ,pitchrcf: %f , yawrcf: %f, throttlercf: %f \n",rollrcf, pitchrcf, yawrcf, throttlercf);
    // pc6.period_ms(cycle);
    // pb15.period_ms(20);

    // flight mode
    //  pb15.write((raport + ((activated/100)*2))/multiplicator);

    //directional and power
    pb13.write(yawrcf);
    pa15.write(pitchrcf);
    pc7.write(rollrcf);
    pb5.write(throttlercf);

    return;
};

