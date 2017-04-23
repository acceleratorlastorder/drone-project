print ("about to restart the module brb dude :) ")


if iswebsocketactivated == 1 then
    local websocket = require "websocket"
    websocket.closewebsocket()
else
    print("invalid operation")
end


node.restart()  -- this will restart the module.
