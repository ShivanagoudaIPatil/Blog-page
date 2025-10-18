let count = document.querySelectorAll(".count");

for(let i=0;i<count.length;i++){
let track=0;    
count[i].addEventListener("click",()=>{
    if(track==0){
        
        count[i].innerText=`${++count[i].innerText}`;
        track++;
        
    }
    else if(track==1){
        count[i].innerText=`${--count[i].innerText}`;
        track--;
    }
})
}




