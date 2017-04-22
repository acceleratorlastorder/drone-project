uart.setup(0, 115200, 8, uart.PARITY_NONE, uart.STOPBITS_1, 1)


print (uart.getconfig(0))

local U = {}


function sendData (datatosend)
    uart.write(0, datatosend)
    gpio.write(3, gpio.HIGH)
    tmr.delay(1000)   -- wait 1,000,000 us = 1 second
    gpio.write(3, gpio.LOW)
end

U.sendData = sendData
 
return U