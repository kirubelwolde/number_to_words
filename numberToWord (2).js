
var input="";
var digitsEn=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
var tensEn=["Tenty","Twenty","Thirty","Fourty","Fifty","Sixty","Seventy","Eighty","Ninty"];
var levelsEn=["Ten","Hundred","Thousand","Million","Billion","Trillion"];
var tenersEn=["Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"]
var negEn=["Negative"]
var textsEn=["Enter Number","Select Language","The number is too long"]

var digitsAm=["ዜሮ","አንድ","ሁለት","ሶስት","አራት","አምስት","ስድስት","ሰባት","ስምንት","ዘጠኝ"];
var tensAm=["አስራ","ሃያ","ሰላሳ","አርባ","ሃምሳ","ስድሳ","ሰባ","ሰማንያ","ዘጠና"];
var levelsAm=["አስር","መቶ","ሺህ","ሚልየን","ቢልየን","ትሪልየን"];
var negAm=["ኔጌቲቭ"]
var textsAm=["ቁጥሩን ያስገቡ","ቋንቋ ይምረጡ","ቁጥሩ በጣም ረዘመ"]


var digits=[]
var tens=[]
var levels=[]
var neg=[]
var texts=[]



  function prints(){
    var fin="";

    if (lang.value=="amharic") {
      digits = digitsAm
      tens = tensAm
      levels = levelsAm
      neg = negAm
      texts = textsAm
    }
    else if (lang.value=="english") {
      digits = digitsEn
      tens = tensEn
      levels = levelsEn
      neg = negEn
      texts = textsEn
    }

    numbLabel.innerHTML = texts[0];
    langLabel.innerHTML = texts[1];

    input = numb.value;
    answer.style.color = "#555555";
    if (input.length==0) {
      answer.innerHTML = "";
      return
    }
    else if (input.length>15) {
      answer.innerHTML = texts[2];
      answer.style.color = "#AA0000";
      return
    }
    else if (input==0){
      answer.innerHTML = digits[0];
      return
    }

    if (input[0]=="-") {
      input = input.slice(1,input.length)
      fin+=neg[0]+" ";
    }
    var val = eval(input);
    fin += alltexter(allDivide(val,[]));
    answer.innerHTML = fin;
  }

  function alltexter(arr){
    var leng = arr.length;
    var j = 2;
    var text = "";

    for (var i = leng; i >= 0; i--) {
      if (!(arr[i-1]==000)) {
        text += singleDivide(arr[i-1])+" ";
      if (i>=2) {
        text += levels[i]+" ";
        }
      }
    }
    return text;
  }

  function allDivide(total,input){
    var threed = total%1000;
    input.push(threed);

    var cont = Math.floor(total/1000);

    if (cont>=1000) {
      allDivide(cont,input);
    }
    else if (cont<1000 && cont>0) {
      input.push(cont);
    }

    return input
  }

  function singleDivide(cont){
    if (cont==0) {
      return(digits[0])
    }
    var hund=0;
    var ten=0;
    var one=0;
   if (cont>=100) {
      hund = Math.floor(cont/100);
      cont = cont%100;
   }
   if (cont>=10) {
     ten = Math.floor(cont/10);
     cont = cont%10;
   }
   one = cont

    var text="";

     if (hund>0) {
       text+=digits[hund] +" "+levels[1]+" ";
       if (lang.value=="english" && ten > 0) {
         text+= "and ";
       }
     }
     if (ten>0){
       if (one>0 && ten==1 && lang.value=="english") {
         text+=tenersEn[one-1]
       }
       else if (one==0 && ten==1) {
         text+=levels[0]+" ";
       }
       else {
         text+=tens[ten-1]+" ";
       }
     }
     if (one>0) {
       if (ten==1 && lang.value=="english") {

       }
       else {
       text+=digits[one]+" ";
       }

     }
    return text
  }
