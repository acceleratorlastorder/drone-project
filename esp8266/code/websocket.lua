local function startwebsocket()
  local test = require 'uartmanager'
  node.setcpufreq(node.CPU160MHZ)
  ws = websocket.createClient()
  ws:config({headers={['User-Agent']='NodeMCU',['Id']='Drone'}})
  ws:on("connection", function(ws)
    print('got ws connection')
    ws:send('connection from the esp 8266 with the IP: ' .. wifi.sta.getip())
  end)
  ws:on("receive", function(_, msg, opcode)
    ws:send("received")
    
    test.sendData (msg)
    --print(msg)-- msg, opcode is 1 for text message, 2 for binary
    msg=nil opcode=nil
  end)
  ws:on("close", function(_, status)
    print('connection closed', status)
    ws = nil -- required to lua gc the websocket client
  end)
  ws:connect('ws://192.168.43.247:8080')  
end

startwebsocket()


--local C = {}
  --function closewebsocket(lol) return print ('YOLO' .. lol) end
  --close.closewebsocket = closewebsocket
--return C
