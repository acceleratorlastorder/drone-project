#include "mbed.h"
#include "errorcode.h"

int main()
{
    while(1) {
        buttonisused();
        errorcode(5, 3, 2);
        valueofbuttonincrement();

    }

};
