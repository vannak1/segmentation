/*
 * Takes a str and splits into array 
 * of sentences, bracketed words or uncaught chars
 * returns arrays of obj with id of line and string.
 * 
 * @param {*} str 
 */
var strSplitter = function(str){
    var regex = /\[[^\]]+\]|\w([.]\w{3}|[^.!?])+[.?!]|[^\s]/g;
    
    let strs;
    let results = [];
    let i = 1;

    while ((strs = regex.exec(str)) !== null) {
        if (strs.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        strs.forEach((match, groupIndex) => {
           if(groupIndex === 0){
            results.push({id: i, string: match})
            i += 1;
           }
           
        });
    }
    return results;
};

/*
 * Takes an array of strings and max length of each line
 * returns array of strings with sentences joined to be 
 * close to maxLen without cutting off word.
 *  
 * @param {*} strs 
 * @param {*} maxLen 
 * 
 */

var shortStrJoiner = function(strs, maxLen){
    
};

var segmentObjCreator = function(arr){
    let results = [];
    let segmentId = 1;

    for(let pos = 0; pos < arr.length; pos++){
        if(arr[pos].match(/\[[^\]]+\]/g)){
            //break on [words in bracket]
            results.push(createObjMax84Char(arr[pos], segmentId));
            segmentId++;
        } else {
            //create obj if sentence longer than 42
            if(arr[pos].length > 42){
                results.push(createObjMax84Char(arr[pos], segmentId));
                segmentId++;
            } else {
                //only looks ahead 1 sentence
                let diff = 42 - arr[pos].length;
                let tempStr =[];
                tempStr.push(arr[pos]);
                if(arr[pos + 1] && arr[pos + 1].length < diff){
                    tempStr = [arr[pos], arr[pos + 1]]
                }
              
                results.push(createObjMax84Char(tempStr, segmentId));
                    segmentId++;
                    pos++;
            }
        }
    }

    return results;
};

var createObjMax84Char = function(str, segmentId){
    let obj = {};
    let results = [];

    if(str.length <= 42){
        obj = {
            id: segmentId,
            line1: str
        };
        results.push(obj);
        segmentId += 1;
    } else {
        let lines = splitByLength(str, 42);
        for(let i = 0; i < Math.ceil(lines.length / 2); i += 2){
          if(lines.length - i > 1){
            obj = {
                id: segmentId,
                line1: lines[i],
                line2: lines[i+1]
            };
          } else {
            obj = {
                id: segmentId,
                line1: lines[i],
            }; 
          }
        }
        results.push(obj);
    }

    return results;
}

var splitByLength = function (str, l){
    var strs = [];
    while(str.length > l){
        var pos = str.substring(0, l).lastIndexOf(' ');
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(' ', pos)+1;
        if(i < pos || i > pos+l)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}

var segmentJoiner = function(str){
    let strs = strSplitter(str);

    return strs;
}

export default segmentJoiner;