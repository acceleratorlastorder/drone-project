print ("init the esp8266")
-- print ("well i'm back now what are you up to ? :)")
-- local ledblink = require ("ledblink")
-- ledblink.blinkled(3,1)
    gpio.mode(6, gpio.OUTPUT)
    gpio.write(6, gpio.LOW)
    tmr.delay(500000)   -- wait 1,000,000 us = 1 second
    gpio.write(6, gpio.HIGH)

print('collectgarbage: ',collectgarbage())

dofile ("wificonnect.lua")
dofile ("websocket.lua")
