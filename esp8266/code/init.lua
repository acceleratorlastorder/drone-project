print "init the chip"
print "well i'm back now what are you up to ? :)"
local ledblink = require ("ledblink")
ledblink.blinkled(3,1)
wifi.setmode(wifi.STATION)
dofile("wificonnect.lua")
dofile("server.lua")