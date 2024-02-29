const base_url=
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const exchange_btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
let msg=document.querySelector(".msg")





for(let select of dropdown){
for(code in countryList) {
  let newOption = document.createElement("option");
  newOption.innerText=code;
  newOption.value=code;
  
 if(select.name==="from" && code ==="USD"){
    newOption.selected="selected";
 }
 else if(select.name==="to" && code ==="INR"){
    newOption.selected="selected";

}
select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);//select tag
});

}
const updateFlag=(element)=>{
    let code=element.value;//value==attribute of the selected option
    let countryflag=countryList[code];
    let newSrc=`https://flagsapi.com/${countryflag}/shiny/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newSrc;

}
exchange_btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("input");
    let amtval=amount.value;
    console.log(amtval);
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    const URL=`${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];


    let finalamount=amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
    msg.style.display="inline-block";
    


})