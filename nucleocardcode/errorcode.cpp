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
void errorcode(int green, int blue, int red)
{

    for (int i=0; i<green; ++i) {
        myled1 = !myled1;
        wait(0.1);
    };
    for (int i=0; i<blue; ++i) {
        myled2 = !myled2;
        wait(0.1);
    };
    for (int i=0; i<red; ++i) {
        myled3 = !myled3;
        wait(0.1);
    };


}
int main()
{

    buttonisused();
    errorcode(2, 8, 9);

}
