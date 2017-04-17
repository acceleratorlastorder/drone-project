print "init the chip"
print "well i'm back now what are you up to ? :)"
local ledblink = require ("ledblink")
ledblink.blinkled(3,2)
wifi.setmode(wifi.STATION)
dofile("wificonnect.lua")
