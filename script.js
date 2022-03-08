
let compareButton = document.querySelector('#startCompare');
console.log(compareButton);

let eStrOrigin = document.querySelector('#strOrigin');      // 원본텍스트
let eStrCompare = document.querySelector('#strCompare');    // 비교할 텍스트
let eOutput = document.querySelector('#output');
let eErrorOutput = document.querySelector('#errMsg');
let existNewLine = false; //개행문자의 여부
let existSpace = false; // 띄어쓰기 여부

let eIgnoreNewLine = document.querySelector('#bIgnoreNewLine');
let eIgnoreSpace = document.querySelector('#bIgnoreSpace');
let ignoreNewLine = false;
let ignoreSpace = false;
let eClear = document.querySelector('#eClear');

eIgnoreNewLine.addEventListener('click',(e)=>{
    //alert(e.target.checked)
    ignoreNewLine = e.target.checked; // true  시 개행문자 무시
    if(ignoreNewLine)
    {   // 개행문자를 제외하여 다시 입력값으로 넣기
        eStrCompare.value = textConverter_ignoreChar('\n',eStrCompare.value);
        eStrOrigin.value = textConverter_ignoreChar('\n',eStrOrigin.value);
    }
});
eIgnoreSpace.addEventListener('click',(e)=>{
    ignoreSpace = e.target.checked; // true 시 띄어쓰기 무시
    if(ignoreSpace)
    {   // 띄어쓰기를 제외하여 다시 입력값으로 넣기
        eStrCompare.value = textConverter_ignoreChar(' ',eStrCompare.value);
        eStrOrigin.value = textConverter_ignoreChar(' ',eStrOrigin.value);
    }

})
eClear.addEventListener('click',(e)=>{
    eStrCompare.value = '';
    eStrOrigin.value='';
    eOutput.textContent='';
    eErrorOutput.textContent='';
    textCounting();
})


/** 입력 옵션  */

eStrOrigin.addEventListener('keyup',(e)=>{
    //개행문자 무시 모드
    if(ignoreNewLine){eStrOrigin.value = textConverter_ignoreChar('\n',eStrOrigin.value);}
    // 띄어쓰기 무시 모드
    if(ignoreSpace){eStrOrigin.value = textConverter_ignoreChar(' ',eStrOrigin.value);}
    
    compareText(eStrOrigin,eStrCompare);
    textCounting();
})


eStrCompare.addEventListener('keyup',(e)=>{
    // 개행문자 무시 모드
    if(ignoreNewLine){eStrCompare.value = textConverter_ignoreChar('\n',eStrCompare.value);}
    // 띄어쓰기 무시모드
    if(ignoreSpace){eStrCompare.value = textConverter_ignoreChar(' ',eStrCompare.value);}

    compareText(eStrOrigin,eStrCompare);
    textCounting();
})



compareButton.addEventListener('click',(e)=>{
    // 비교 시작!
    compareText(eStrOrigin,eStrCompare);
    textCounting();
})


function compareText(eStrOrigin,eStrCompare){

    errClear();
    let strOrgin = eStrOrigin.value;
    let strCompare = eStrCompare.value;

    let arrOrigin = [...strOrgin];
    let arrCompare = [...strCompare];
 
    let resultText = []; // 결과 텍스트를 저장할 배열

    existNewLine = false; //개행문자의 여부
    existSpace = false;

    // 비교후에 틀린 문자열이 발견된다면,
    // 그 문자열 앞 뒤로 <strong class="different"></strong> 을 넣을것이다.
    for(let i = 0; i<arrCompare.length ; i++)
    {
        if(arrOrigin[i] !== arrCompare[i])
        {
            if(arrCompare[i] ==='\n' || arrOrigin[i] ==='\n')
            {
                errPrint('줄바꿈이 감지되었습니다. 줄바꿈을 빼고 입력해주세요');
                existNewLine = true;
            }
            else if(arrCompare[i] ===' '|| arrOrigin[i]===' ')
            {
                existSpace = true;
                errPrint('띄어쓰기를 맞추어주세요, 띄어쓰기가 있어 정확한 비교가 불가능합니다.')
            }
            else
            {
                //문자열을 비교했을때 틀리다면
                let markingText = `<strong class="different">${arrCompare[i]}</strong>`
                resultText.push(markingText);
                errPrint(`틀린 문자가 발견되었습니다.`);
            }
        }
        else{
            resultText.push(arrCompare[i]);
        }
    }

    print(resultText.reduce((a,c)=>{
        a = a+c;
        return a
    },''));

    textCounting()
  
}

function print(str)
{
    eOutput.innerHTML=str;
}

function errPrint(str)
{
    eErrorOutput.id='errMsg'
    if(existNewLine)
    {
        eErrorOutput.textContent = `줄바꿈을 없애주세요, 줄바꿈이 있어 정확한 비교가 불가능합니다.`;
    }
    else if(existSpace)
    {
        eErrorOutput.textContent = `띄어쓰기를 맞추어 주세요, 띄어쓰기가 있어 정확한 비교가 불가능합니다`;
    }
    else
    {
        eErrorOutput.textContent = str;
    }
    
}
function errClear()
{
    eErrorOutput.id = 'noErrMsg'
    eErrorOutput.textContent = '틀린문자가 없습니다.';
}

/**
 * 문장에서 특정 문자열 제외
 */
function textConverter_ignoreChar(char,str)
{
    let arrStr = [...str]; // 배열화
    let result = [];
    
    result = arrStr
    .filter((elem)=>{
        return elem === char ? false : true;
    })
    .reduce((a,c)=>{a= a+c; return a},'')

    return result;
}

function textCounting()
{
    let countOriginText = document.querySelector('#eOriginTextCount');
    countOriginText.textContent=`(문자개수 : ${eStrOrigin.value.length})`;

    let countCompareText = document.querySelector('#eCompareTextCount');
    countCompareText.textContent=`(문자개수 : ${eStrCompare.value.length})`;
}
