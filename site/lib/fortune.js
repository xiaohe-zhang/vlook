var fortuneCookies = [ 
     "Hi,笨蛋！",
     "Hi,软蛋",         
     "你是个大好人",         
     "大骗纸",          
      ];  
exports.getFortune = function() {        
     var idx = Math.floor(Math.random() * fortuneCookies.length);         
     return fortuneCookies[idx]; 
    };
