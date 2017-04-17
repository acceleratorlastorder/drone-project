local M = {}

function blinkled (ledtoblink, howmanytime)
  print("so you want some blinking led ? ^^")
  print("well let's start the LED " .. ledtoblink .." and " .. howmanytime .. " time(s) :)")
  for i = 1, howmanytime, 1 do
    gpio.write(ledtoblink, gpio.HIGH)
    tmr.delay(500000)   -- wait 1,000,000 us = 1 second
    gpio.write(ledtoblink, gpio.LOW)
    tmr.delay(500000)
  end
  print("blinking done")
end

M.blinkled = blinkled
 
return M