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

int nowavetype()
{
    while(1) {
        myled1 =!myled1;
        wait(0.1);
    }
    return;
}

float firstwavetype()
{
    myled1 = 1;
    wait(1);
    myled1 = !myled1;
    wait(2);
    while(1) {
        myled1 = !myled1;
        wait(0.1);
        buttonisused();
        myled2 = !myled2;
        wait(0.1);
        buttonisused();
        myled3 = !myled3;
        wait(0.1);
        buttonisused();
        myled3 = !myled3;
        wait(0.1);
        buttonisused();
        myled2 = !myled2;
        wait(0.1);
        buttonisused();
        myled1 = !myled1;
        wait(0.1);
        buttonisused();
        break;
    }
    return false;
}

float secondwavetype()
{
    myled1 = 1;
    wait(0.1);
    myled1 = !myled1;
    wait(0.1);
    while(1) {
        myled1 = !myled1;
        wait(0.001);
        myled2 = !myled2;
        wait(0.001);
        myled3 = !myled3;
        wait(0.001);
        break;
    }
    return false;
}
int thirdwavetype()
{
        if (i==0) {
            myled3 = 1;
            wait(0.1);
            myled3 = 0;
            wait(0.1);
            myled3 = 1;
            wait(0.1);
            myled3 = 0;
            wait(0.1);
            while(1) {
                myled3 = !myled3;
                wait(1);
                myled2 = !myled2;
                wait(1);
                myled1 = !myled1;
                wait(1);
                break;
            }
        } else
            while(1) {
                myled3 = !myled3;
                wait(1);
                myled2 = !myled2;
                wait(1);
                myled1 = !myled1;
                wait(1);
                break;
            }

    return false;
}

void selectwave()
{
    if (buttonincrement==0) {
        nowavetype();
    } else if(buttonincrement==1) {
        firstwavetype();
    } else if(buttonincrement==2) {
        secondwavetype();
    } else if(buttonincrement==3) {
        thirdwavetype();
    } else
        buttonincrement=0;
    return;
}


int main()
{
    while (1) {
        buttonisused();
        selectwave();

    }

}
