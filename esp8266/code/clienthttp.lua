  sendData = function()
  conn=net.createConnection(net.TCP, 0)
  conn:on("receive", function(conn, payload) print(payload) end)

  conn:connect(80,'192.168.43.247')

  conn:send("POST /proxy HTTP/1.1\r\n")
  conn:send("Host: localhost\r\n")
  conn:send("Accept: */*\r\n")
  conn:send("User-Agent: Mozilla/4.0 (compatible; esp8266 Lua; Windows NT 5.1)\r\n")
  conn:send("\r\n")
  conn:on("sent",function(conn)
    print("Closing connection")
   conn:close()
  end)

    conn:on("disconnection", function(conn)
    print("Got disconnection...")
     end)
  end