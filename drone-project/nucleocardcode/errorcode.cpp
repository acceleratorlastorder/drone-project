#include "mbed.h"
DigitalOut myled1(LED1);
DigitalOut myled2(LED2);
DigitalOut myled3(LED3);
DigitalIn  button(USER_BUTTON);

int buttonincrement=0;
void buttonisused()
{
    if (button) {
        buttonincrement+=1;
    } else
        return;

}
void errorcode(green, blue, red){

   for (int i=0; i<10; ++i)
{


};


    }
int main()
{

        buttonisused();
        errorcode(2, 8, 9);

}
