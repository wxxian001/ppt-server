var fs = require('fs');
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
            }
        }

        newFileNames.sort(function(a,b){
            var reg = /(\d*)(\.)/;
            var num1 = parseInt(a.match(reg)[1]);
            var num2 = parseInt(b.match(reg)[1]);
            return num1-num2;
        });

        for(var i=0;i<newFileNames.length;i++){
            var data = fs.readFileSync(path +'/'+newFileNames[i],{encoding:'utf-8'});
            dataArr.push(data);
        }

        return dataArr;
    }
};
