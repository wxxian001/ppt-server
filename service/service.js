var fs = require('fs');
var marked = require('marked');
// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = {
    getData:function*(){
        var packageJson = JSON.parse(fs.readFileSync('./package.json',{encoding:'utf-8'}));
        var dataArr =[],
            path = './public/ppt/'+packageJson.pptSrc || 'koa',
            fileNames = fs.readdirSync(path),
            newFileNames=[];
        for(var i=0;i<fileNames.length;i++){
            if(fileNames[i].indexOf('.')>0){
                if(fileNames[i].lastIndexOf('.html') === fileNames[i].length-".html".length){
                    newFileNames.push(fileNames[i]);
                }
                if(fileNames[i].lastIndexOf('.md') === fileNames[i].length-".md".length){
                    newFileNames.push(fileNames[i]);
                }
            }
        }

        var cssData = "";
        var styleCssPath = path+'/style.css';
        if(fs.existsSync(styleCssPath)){
            cssData += fs.readFileSync(styleCssPath,{encoding:'utf-8'});
        }

        var styleData = "";
        var cssPath = './node_modules/highlight.js/styles/github.css';
        if(fs.existsSync(cssPath)){
            cssData += fs.readFileSync(cssPath,{encoding:'utf-8'});
            styleData = "<style>"+cssData+"</style>";
        }

        newFileNames.sort(function(a,b){
            var reg = /(\d*)(\.)/;
            var num1 = parseInt(a.match(reg)[1]);
            var num2 = parseInt(b.match(reg)[1]);
            return num1-num2;
        });

        for(var i=0;i<newFileNames.length;i++){
            var fileName = newFileNames[i];
            var data = null;
            if(fileName.lastIndexOf('.html') > 0){
                data = fs.readFileSync(path +'/'+newFileNames[i],{encoding:'utf-8'});
            }else if(fileName.lastIndexOf('.md') > 0){
                data = fs.readFileSync(path +'/'+newFileNames[i],{encoding:'utf-8'});
                data = marked(data);
            }
            if(i === 0){
                data = styleData + data;
            }
            dataArr.push(data);
        }

        return dataArr;
    }
};
