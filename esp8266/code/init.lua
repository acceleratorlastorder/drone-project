print ("init the esp8266")

package.loaded.websocket = nil
-- print ("well i'm back now what are you up to ? :)")
-- local ledblink = require ("ledblink")
-- ledblink.blinkled(3,1)
dofile("wificonnect.lua")
iswebsocketactivated = 0
dofile("websocket.lua")