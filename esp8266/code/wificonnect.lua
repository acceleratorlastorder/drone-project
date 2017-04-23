wifi.setmode(wifi.STATION)
wifi.setphymode(wifi.PHYMODE_N)
local ssidconfig = require ("ssidconfig")
wifi.sta.config(SSID,PASSWORD,false)
-- register event callbacks for WiFi events
wifi.sta.eventMonReg(wifi.STA_CONNECTING, function(previous_state)
    if(previous_state==wifi.STA_GOTIP) then 
        print("Station lost connection with access point. Attempting to reconnect...")
    else
        print("STATION_CONNECTING")
    end
end)
print ("starting to connect with the login/password given previously")
wifi.sta.connect()   -- wait 1,000,000 us = 1 second
print ("trying to connect")
print ("status: "..wifi.sta.status())
wifi.sta.eventMonReg(wifi.STA_CONNECTING, function(previous_State)
    if(previous_State==wifi.STA_GOTIP) then
        print("Station lost connection with access point\n\tAttempting to reconnect...")
    else
        print("STATION_CONNECTING")
    end
end)
wifi.sta.getrssi()
myip = wifi.sta.getip()
mac_adress = wifi.sta.getmac()
print ("my ip", myip)
print ("mac adress : " .. mac_adress .. " wifi mode: " .. wifi.getphymode())
wifi.getphymode()
