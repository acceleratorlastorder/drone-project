DigitalOut myled1(LED1);
DigitalOut myled2(LED2);
DigitalOut myled3(LED3);
DigitalIn  button(USER_BUTTON);

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
    if (button) {
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
    resetled();
    for (int i=0; i<buttonincrement; ++i) {
        myled2 = 1;
        wait(0.7);
        myled2 = 0;
        wait(0.7);
    };
    return;
};
