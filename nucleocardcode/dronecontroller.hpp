#include <iostream>
#include <string>
#include "mbed.h"

DigitalOut arduino0(A0);
DigitalOut arduino1(A1);
DigitalOut arduino2(A2);
PwmOut pc6(PB_15);


int waitvalue = 1;

void pwmtest()
{
    pc6.period_ms(10);
    pc6.write(0.50f);   

    return;
};

void manageinput(string x){
    cout << "bonjour te voila dans la fonction manage input bon on va commencer par voir ce que m'a donne" << endl << "voici la string que tu m'a donnee en argument pour la fonction manageinput " << x << endl; 
    
    return;
    };