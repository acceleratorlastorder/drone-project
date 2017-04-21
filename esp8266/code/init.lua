print ("init the chip")
print ("well i'm back now what are you up to ? :)")
local ledblink = require ("ledblink")
ledblink.blinkled(3,1)
dofile("wificonnect.lua")
dofile("websocket.lua")


