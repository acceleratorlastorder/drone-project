 //#include <iostream>
#include "mbed.h"

/********* ANALOG IN ************/
Serial pc(USBTX, USBRX); // tx, rx
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
    pitchrcf = ((pitchRaw/100)*2);
    rollrcf = ((rollRaw/100)*2);
    throttlercf = ((throttleRaw/100)*3)+raport;
    yawrcf = ((yawRaw/100)*2);


    //std::cout << " y pitch raport cyclique flotant (RCF): " << ypitchrcf << " x roll raport cyclique flotant (RCF): " << xrollrcf << " y throttle raport cyclique flotant(RCF): " << ythrottle << " period: " << cycle << " multiplicator: " << multiplicator << " calcule (raport + ythrottlercf)/multiplicator " << (raport + ythrottlercf)/multiplicator << endl;
  //  pc.printf("rollrcf: %f ,pitchrcf: %f , yawrcf: %f, throttlercf: %f \n",rollrcf, pitchrcf, yawrcf, throttlercf);
    // pc6.period_ms(cycle);
    // pb15.period_ms(20);

    // flight mode
    //  pb15.write((raport + ((activated/100)*2))/multiplicator);

    //directional and power
    pb13.write(throttlercf+pitchrcf+yawrcf+rollrcf); //top left
    pa15.write(throttlercf+pitchrcf-yawrcf-rollrcf); //top right
    pc7.write(throttlercf-pitchrcf+yawrcf-rollrcf); // back right
    pb5.write(throttlercf-pitchrcf-yawrcf+rollrcf); //back left

    return;
};

