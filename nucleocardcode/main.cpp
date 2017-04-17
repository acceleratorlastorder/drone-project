#include "errorcode.hpp"
#include "dronecontroller.hpp"
#include "Servo.h"

Servo myservo(PC_7);
long double delay,waittime;
int main()
{
    pc.baud(115200);

    cout << "hello ! "<< endl;
    cout << "please set a value for the percentage" << endl;
    cin >> cycle;
    cout << "checking the value is : " << percent << endl;
    // percent += 0.000f;
    cout <<  "adding the f to that value now we have: " << percent << endl;
    delay = 1.000;

    while (1) {

        xroll = a0.read();
        ypitch = a1.read();
        ythrottle = a2.read();

        xpercent = x*percent;
        ypercent = y*percent;
        b = pa7.read();
        
        xv = a0.read_u16();
        yv = a1.read_u16();

        cout << "x: " << x << ", y: " << y << ", b: " << b << ", x voltage: " << xv << ", y voltage: " << yv << ",x percent: " << xpercent << ", y percent: " << ypercent << " bouton used ? " << waiting << endl;
        pwmtest(y,x);
        indicatorandwaitingvalue();

    }

}
