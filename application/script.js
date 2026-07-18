function updateTime(){

const now=new Date();

document.getElementById("time").innerHTML=

now.toLocaleString();

}

updateTime();

setInterval(updateTime,1000);
