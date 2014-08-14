
var rule = function(operator){
    switch(operator){
        case "pre":
            return "pre";
            break;
        case "next":
        default:
            return "next";
    }
};

if(typeof module !== 'undefined' && module.exports){
  module.exports = rule;
}
