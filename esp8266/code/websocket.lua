local function startwebsocket()
  local test = require ('uartmanager')
  node.setcpufreq(node.CPU160MHZ)
  ws = websocket.createClient()
  ws:config({headers={['User-Agent']='NodeMCU',['Id']='Drone'}})
  ws:on("connection", function(ws)
  --  print('got ws connection')
    ws:send('connection from the esp 8266 with the IP: ' .. wifi.sta.getip())
  end)
  ws:on("receive", function(_, msg, opcode)
    ws:send("ok i got it: ", opcode) 
  --  test.sendData (msg)
    print(msg)-- msg, opcode is 1 for text message, 2 for binary
    msg=nil opcode=nil
  end)
  ws:on("close", function(_, status)
  --  print('connection closed', status)
    ws = nil -- required to lua gc the websocket client
    print("ws lost")
    gpio.mode(6, gpio.OUTPUT)
    gpio.write(6, gpio.LOW)
    tmr.delay(500000)   -- wait 1,000,000 us = 1 second
    gpio.write(6, gpio.HIGH)
    startwebsocket()
  end)
  ws:connect('ws://192.168.2.20:8080')  
end

startwebsocket()
