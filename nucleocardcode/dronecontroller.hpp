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
int yraportcyclique, xraportcyclique;
float xroll,ypitch,ythrottle,xv,yv,by,xpercent,ypercent,yraportcycliqueflotant,cycle,raport,multiplicator;
bool b;
short int percent = 100;
bool waiting = 0;




int waitvalue = 1;
void indicatorandwaitingvalue()
{
    if (ypercent > 33) {
        myled1 = 1;

    } else {
        myled1 = 0;
    }
    if (ypercent > 49) {
        myled2 = 1;

    } else {
        myled2 = 0;
    }
    if (ypercent > 95) {
        myled3 = 1;

    } else {
        myled3 = 0;
    }
    if (b) {
        waiting = 1;
    }
    if(button) {
        waiting = 0;
    }

    if (waiting) {
        wait(0.20);
    }
    if (!waiting) {
        wait(0);
    }


}

void pwmtest(float ypitch,float xroll,float ythrottle)
{
    yraportcycliqueflotant = (ypitch/100)*2;
    raport = 0.05f;
    multiplicator = cycle/20;
    xraportcyclique = x;

    cout << "y raport cyclique flotant: " << yraportcycliqueflotant << " x raport cyclique: " << xraportcyclique << " period: " << cycle << " multiplicator: " << multiplicator << " calcule (raport + yraportcycliqueflotant)/multiplicator " << (raport + yraportcycliqueflotant)/multiplicator <<endl;
    pc6.period_ms(cycle);
    pb15.period_ms(20);

    pc6.write((raport + yraportcycliqueflotant)/multiplicator);
    pb15.write(xraportcyclique + 0.00f);
    //  pc6.write(xraportcyclique);
    return;
};

