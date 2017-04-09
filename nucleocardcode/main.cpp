#include "errorcode.hpp"
#include "dronecontroller.hpp"

using namespace std;
char inputuservariable[]= "";
string mystring= "";


int main()
{


    while(1) {

        cout << "bon tu vas m'ecire un truck comme ca je peut savoir si c'est bon ou pas lel " << " ah et mystring pointeur est " << &mystring << endl;


        cin >> mystring;

        cout << "bon tu as ecris " << mystring << " je lancerais une fonction pour traiter les donnees plus tard" << endl;

        cout << "et le pointeur de mystring après edit est: " << &mystring << endl;

        manageinput(mystring);

    }



    /*

        pc6.period_ms(20);
            pc6.write(0.50f);



    */
    /*
    pc.printf("Hello World!\n");

    while(1) {


        if (errorstate == 1) {
            errorcode(1, 1, 1);
        }
        if (errorstate == 2) {
            pc.printf("starting blinkled \n");
            blinkled();
            buttonisused();
            valueofbuttonincrement();
        }

        else {
                pc.printf("pas d'erreur, cool :) \n");
            break;
        }
    }
     char c[] = "M@teo21";
    cout << "bon bah c = " << c << endl;
    while(1) {
        if(c == "u") {
            cout << "c is: " << c << endl;
        }
        if(c == "l") {
            pc.printf("bon c'est d normalement mais bon c: %d \n", c);
        }

    }
    */
};
