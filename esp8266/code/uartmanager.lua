uart.setup(0, 115200, 8, uart.PARITY_NONE, uart.STOPBITS_1, 1)


print (uart.getconfig(0))

local U = {}


function sendData (datatosend)
    uart.write(0, datatosend..tonumber(0x00, 16))
end

U.sendData = sendData
 
return U
