print("server start")
sv = net.createServer(net.TCP, 50)
local uartmanager = require ("uartmanager")
function receiver(sck, data)
  uartmanager.sendData(data)
 -- print("data received: ", data , " sck: ", sck)
  sck:close()
end

if sv then
  sv:listen(80, function(conn)
    conn:on("receive", receiver)
    conn:send("hello world")
  end)
end

print("last line of the server file")
