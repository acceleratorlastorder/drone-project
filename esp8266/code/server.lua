print("server start")
sv = net.createServer(net.TCP, 50)

function receiver(sck, data)
  print(data)
  sck:close()
end

if sv then
  sv:listen(80, function(conn)
    conn:on("receive", receiver)
    conn:send("hello world")
  end)
end

print("last line of the server file")