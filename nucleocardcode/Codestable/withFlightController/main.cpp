#include "dronecontroller.hpp"

void rxManager(void)
{
    tmp = esp8266.getc();
    if(!(/*tmp=='0x0D' || tmp == '0x0A' || */tmp == '\0')) {
        arrayFromESPbuffer[i] = tmp;
    }
    if (tmp == ']') {
        i=0;
    } else {
        i++;
    }

}

int main()
{
    pc.baud(115200);
    esp8266.baud(115200);
    pc.printf("Hello World! \n");
    esp8266.attach(&rxManager, Serial::RxIrq);
    while(1) {
        // printf("array: %s and trash %c \n", arrayFromESPbuffer, trash);
        //wait(0.2);
        wait_ms(10);
        arrayDecomposer(arrayFromESPbuffer, 38);
        memset (arrayFromESPbuffer,0,38);
        indicatorvalue();
        pwmManager(arrayOfFloat);
    }
}