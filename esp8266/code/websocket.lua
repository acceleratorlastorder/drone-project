iswebsocketactivated = 1
ws = websocket.createClient()
ws:config({headers={['User-Agent']='NodeMCU',['Id']='Drone'}})
ws:on("connection", function(ws)
  print('got ws connection')
end)
ws:on("receive", function(_, msg, opcode)
  ws:send('connection from the esp 8266 with the IP: ' .. wifi.sta.getip())
  print('got message:', msg, opcode) -- opcode is 1 for text message, 2 for binary
end)
ws:on("close", function(_, status)
  print('connection closed', status)
  ws = nil -- required to lua gc the websocket client
end)
ws:connect('ws://192.168.1.13:8080')  

--local C = {}
  --function iwannaclosewebsocket(lol) return print ('YOLO' .. lol) end
  --close.iwannaclosewebsocket = iwannaclosewebsocket
--return C