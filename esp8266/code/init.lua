print ("init the esp8266")
-- print ("well i'm back now what are you up to ? :)")
-- local ledblink = require ("ledblink")
-- ledblink.blinkled(3,1)


print('collectgarbage: ',collectgarbage())

loadfile ("wificonnect.lc")
loadfile ("websocket.lua")