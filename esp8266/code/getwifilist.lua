    -- print ap list
    function listap(t)
          for ssid,v in pairs(t) do
            authmode, rssi, bssid, channel = 
              string.match(v, "(%d),(-?%d+),(%x%x:%x%x:%x%x:%x%x:%x%x:%x%x),(%d+)")
            print(ssid,authmode,rssi,bssid,channel)
          end
    end
          
    wifi.sta.getap(listap)

    function listap(t)
      for k,v in pairs(t) do
        print(k.." : "..v)
      end
end
wifi.sta.getap(listap)