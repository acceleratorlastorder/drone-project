#include "mbed.h"
/*************SERIAL********************/

RawSerial pc(USBTX, USBRX); // TX, RX
RawSerial esp8266(PC_12, PD_2); // TX, RX

/********* ANALOG IN ************/
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

/********** DIGITAL IN ***********/

DigitalIn  button(USER_BUTTON);

/*********** DIGITAL OUT ***********/

DigitalOut myled1(LED1);
DigitalOut myled2(LED2);
DigitalOut myled3(LED3);

/*******FUNCTION PROTOYPE**************/

void rxManager(void);
extern void* memset();
extern void strcopy(char *d, char *s);
void indicatorvalue(void);
void arrayDecomposer(char *array, unsigned short int arrayLength);
void pwmManager(float *array);

/*****************VARIABLES************/

float arrayOfFloat[4];//{roll,pitch,yaw,throttle};
char arrayFromESPbuffer[38];
volatile unsigned short int i;
volatile char tmp;
volatile float throttlepercent;
unsigned short int k=0,s=0;
/*******FUNCTIONS**************/

void indicatorvalue(void)
{

    throttlepercent = arrayOfFloat[3]*100;
    if (throttlepercent > 20) {
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


void arrayDecomposer(char *array, unsigned short int arrayLength)
{
    char tmpArray[38];
    strcpy (tmpArray,array);
    char buffer[10]= {0};
    for (int j=0; j<arrayLength; j++) {
        if (tmpArray[j]==']' || '\0') {
            s=0,k=0;
            break;
        }
        if(tmpArray[j]=='[') {
            memset (buffer,0,10);
            s=0,k=0;
            continue;
        }
        if (tmpArray[j]==',') {
            k=0;
            if (s == 0) {
                //printf("buffer roll %s, s = %d ARRAY: %s \n", buffer, s, tmpArray);
                arrayOfFloat[0] = atof(buffer);
            }
            if (s == 1) {
                arrayOfFloat[1] = atof(buffer);
            }
            if (s == 2) {
                arrayOfFloat[2] = atof(buffer);
            }
            memset (buffer,0,10);
            s++;
        } else {
            buffer[k] = tmpArray[j];
            k++;
        }

    }
    arrayOfFloat[3] = atof(buffer);
    // printf("roll: %f, pitch: %f, yaw: %f, throttle: %f\n the array: %s \n", arrayOfFloat[0], arrayOfFloat[1], arrayOfFloat[2], arrayOfFloat[3], array);
    s=0,k=0;
    return;
}

void pwmManager(float *array)
{
    float  pitchrcf, rollrcf, throttlercf, yawrcf, raport;
    raport = 0.05f;
    rollrcf = (((*(array + 0))/100)*2)+raport;
    pitchrcf = (((*(array + 1))/100)*2)+raport;
    yawrcf = (((*(array + 2))/100)*2)+raport;
    throttlercf = (((*(array + 3))/100)*2)+raport;
    //pc.printf("roll: %f, rollrcf: %f, pitch: %f, pitchrcf: %f, yaw: %f, yawrcf: %f, throttle: %f, throttlercf: %f, array: %s\n",array[0], rollrcf, array[1], pitchrcf, array[2], yawrcf, array[3], throttlercf, array);
    //pc.printf("rollrcf: %f ,pitchrcf: %f , yawrcf: %f, throttlercf: %f \n",rollrcf, pitchrcf, yawrcf, throttlercf);
    // pc6.period_ms(cycle);
    // pb15.period_ms(20);

    // flight mode
    //  pb15.write((raport + ((activated/100)*2))/multiplicator);

    //directional and power
    pb13.write(yawrcf);
    pa15.write(pitchrcf);
    pc7.write(rollrcf);
    pb5.write(throttlercf);

    return;
};