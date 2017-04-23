#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include "mbed.h"

/********* ANALOG IN ************/

AnalogIn a0(A0);
AnalogIn a1(A1);
AnalogIn a2(A2);

/********* PMW OUT ************/

PwmOut pc6(PC_6);
PwmOut pb15(PB_15);
PwmOut pb13(PB_13);
PwmOut pa15(PA_15);
PwmOut pc7(PC_7);
PwmOut pb5(PB_5);

/********* INTERUPTOR ************/

InterruptIn pa7(PA_7); // button
using namespace std;
using std::string;

unsigned int yraportcyclique, xraportcyclique;
float xroll, ypitch, xyaw, ythrottle, xrollv, ypitchv, xyawv, ythrottlev, xrollpercent, ypitchpercent, xyawpercent, ythrottlepercent, ypitchrcf, xrollrcf, ythrottlercf, xyawrcf, cycle, raport, multiplicator;

unsigned short int percent = 100;
bool waiting, b;


void indicatorvalue()
{
    if (roll > 0.33) {
        myled1 = 1;

    } else {
        myled1 = 0;
    }
    if (roll > 0.49) {
        myled2 = 1;

    } else {
        myled2 = 0;
    }
    if (roll > 0.95) {
        myled3 = 1;

    } else {
        myled3 = 0;
    }
}


void pwmManager(float ypitch,float xroll,float ythrottle)
{
    ypitchrcf = (ypitch/100)*2;
    xrollrcf = (xroll/100)*2;
    ythrottlercf = (ythrottle/100)*2;
    raport = 0.05f;
    multiplicator = cycle/20;


    std::cout << " y pitch raport cyclique flotant (RCF): " << ypitchrcf << " x roll raport cyclique flotant (RCF): " << xrollrcf << " y throttle raport cyclique flotant(RCF): " << ythrottle << " period: " << cycle << " multiplicator: " << multiplicator << " calcule (raport + ythrottlercf)/multiplicator " << (raport + ythrottlercf)/multiplicator << endl;
    pc6.period_ms(cycle);
    pb15.period_ms(20);

    // flight mode
    //  pb15.write((raport + ((activated/100)*2))/multiplicator);

    //directional and power
    pb13.write((raport + ypitchrcf)/multiplicator); //for test only i will have to change the ypichrcf by the "yaw" value which is comming soon
    pa15.write((raport + ypitchrcf)/multiplicator);
    pc7.write((raport + xrollrcf)/multiplicator);
    pb5.write((raport + ythrottlercf)/multiplicator);


    return;
};

