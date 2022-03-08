
let compareButton = document.querySelector('#startCompare');
console.log(compareButton);

let eStrOrigin = document.querySelector('#strOrigin');      // 원본텍스트
let eStrCompare = document.querySelector('#strCompare');    // 비교할 텍스트
let eOutput = document.querySelector('#output');
let eErrorOutput = document.querySelector('#errMsg');
let existNewLine = false; //개행문자의 여부
let existSpace = false; // 띄어쓰기 여부

compareButton.addEventListener('click',(e)=>{

    //let eStrOrigin = document.querySelector('#strOrigin');
    //let eStrCompare = document.querySelector('#strCompare');

    compareText(eStrOrigin,eStrCompare);
})
/*
eStrCompare.addEventListener('keyup',(e)=>{
    if(e.keyCode ===13)
    {
        // 엔터를 누른다면
        compareText(eStrOrigin,eStrCompare);
    }
})

eStrOrigin.addEventListener('keyup',(e)=>{
    if(e.keyCode===13)
    {
        // 엔터를 누른다면
        compareText(eStrOrigin,eStrCompare);
    }
})
*/

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

