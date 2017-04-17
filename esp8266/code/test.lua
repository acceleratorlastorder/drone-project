
-- Connexion au réseau Wifi
wifi.setmode(wifi.STATION)
wifi.sta.config ("BTH*******","3937******") -- Réseau Wifi et Clé  
print(wifi.sta.getip()) -- Affiche l'IP attribuée à l'ESP8266

-- Initialisation des broches GPIO0 et GPIO2
gpio.mode(3, gpio.OUTPUT)
gpio.mode(4, gpio.OUTPUT)
gpio.write(3, gpio.LOW);
gpio.write(4, gpio.LOW);

-- Création du serveur web
srv=net.createServer(net.TCP) 
srv:listen(80,function(conn) 
    conn:on("receive", function(client,request)
    
    -- Création d'un buffer permettant "d'écouter" l'URL
        local buf = "";
        local _, _, method, path, vars = string.find(request, "([A-Z]+) (.+)?(.+) HTTP");
        if(method == nil)then 
            _, _, method, path = string.find(request, "([A-Z]+) (.+) HTTP"); 
        end
        local _GET = {}
        if (vars ~= nil)then 
            for k, v in string.gmatch(vars, "(%w+)=(%w+)&*") do 
                _GET[k] = v 
            end 
        end
        local _on,_off = "",""
        
        -- Si l'URL contient "GPIO0ON" alors GPIO0 à 3.3V
        if(_GET.pin == "GPIO0ON")then
              _on = " selected=true";
              gpio.write(3, gpio.HIGH);
              print("GPIO0ON")
              
        -- Si l'URL contient "GPIO0FF" alors GPIO0 à 0V      
        elseif(_GET.pin == "GPIO0OFF")then
              _off = " selected=\"true\"";
              gpio.write(3, gpio.LOW);
              print("GPIO0OFF")
              
        -- Si l'URL contient "GPIO2ON" alors GPIO0 à 3.3V
        elseif(_GET.pin == "GPIO2ON")then
              _off = " selected=\"true\"";
              gpio.write(4, gpio.HIGH);
              print("GPIO2ON")
              
        -- Si l'URL contient "GPIO2ON" alors GPIO0 à 0V
        elseif(_GET.pin == "GPIO2OFF")then
              _off = " selected=\"true\"";
              gpio.write(4, gpio.LOW);
              print("GPIO2OFF")
        end        
        client:send(buf);
        client:close();
        collectgarbage();
    end)
end)
