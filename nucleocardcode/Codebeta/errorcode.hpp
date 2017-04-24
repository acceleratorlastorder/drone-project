#include "mbed.h"
DigitalOut myled1(LED1);
DigitalOut myled2(LED2);
DigitalOut myled3(LED3);
DigitalIn  button(USER_BUTTON);
Serial pc(USBTX, USBRX); // tx, rx

bool errorstate = 0;
int buttonincrement=0;

void resetled()
{
    myled1 = 0;
    myled2 = 0;
    myled3 = 0;
    return;
};

void buttonisused()
{
    printf("buttonincrementvalue: %d\n", buttonincrement);
    if (button) {
        printf("button is used\n");
        buttonincrement++;
        while(button) {
            resetled();
            wait(0.01);
        }
    } else
        return;

};

void errorcode(int green, int blue, int red)
{
    for (int i=0; i<3; ++i) {
        buttonisused();
        resetled();
        for (int i=0; i<green; ++i) {
            myled1 = 1;
            wait(0.7);
            myled1 = 0;
            wait(0.7);
        };
        buttonisused();
        for (int i=0; i<blue; ++i) {
            myled2 = 1;
            wait(0.7);
            myled2 = 0;
            wait(0.7);
        };
        buttonisused();
        for (int i=0; i<red; ++i) {
            myled3 = 1;
            wait(0.7);
            myled3 = 0;
            wait(0.7);
        };

    };
    return;
};
void valueofbuttonincrement()
{
    printf("starting resetled() \n");
    resetled();
    for (int i=0; i<buttonincrement; ++i) {
        buttonisused();
        if (buttonincrement == 0) {
            return;
        } else {
            myled2 = 1;
            wait(0.2);
            myled2 = 0;
            wait(0.2);
            printf("blue led blinking: %d time\n", i);
        }
    };
    return;
};
