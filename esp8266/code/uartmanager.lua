print (uart.getconfig(0))

local U = {}

function sendData (datatosend)
    uart.write(0, datatosend, "salut\n")
end

U.sendData = sendData
 
return U