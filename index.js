async function clickHandler(){
    const textInpt = document.getElementById("input").value
    const msg = {
        method:"POST",
        headers:{
            "Accept": "application/json", 
            "Content-Type": "application/json",
        },
        body:JSON.stringify({"text":textInpt})
    }
    //console.log(msg)
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/",msg)
    if(!response.ok){
        changeResault(null)
    }
    else{
        changeResault((await response.json()).result)
    }
    changeReqStatus(response.status)
}

function changeReqStatus(status){
    let img = document.createElement("img");
    img.setAttribute("src","https://http.cat/" + status)

    let title = document.createElement("h1");
    title.textContent = "Status"

    document.getElementById("reqStatus").appendChild(title);
    document.getElementById("reqStatus").appendChild(img);
}

function changeResault(resObj){
    newWin()
    if(!resObj){
        let textElem = document.createElement("p");
        textElem.textContent = "ERROR ";
        document.getElementById("result").appendChild(textElem);
        return;
    }

    document.getElementById("result").style.color = getColor(resObj.polarity);;

    let titleElem = document.createElement("h1");
    titleElem.textContent = "Resault";
    document.getElementById("result").appendChild(titleElem)

    let textElem = document.createElement("p");
    textElem.textContent = "Type: " + resObj.type;
    document.getElementById("result").appendChild(textElem);

    textElem = document.createElement("p");
    textElem.textContent = "Polarity: " + resObj.polarity;
    document.getElementById("result").appendChild(textElem);
}

function getColor(num){
    let color
    if(num > 0){
        color = "green";
    }
    else if(num < 0){
        color = "red";
    }
    else {
        color = "gray";
    }
    return color
}

function newWin(){
    let el = document.getElementById("result");
    while(el.firstChild){
        console.log(el)
        el.removeChild(el.firstChild)
    }

    el = document.getElementById("reqStatus");
    while(el.firstChild){
        console.log(el)
        el.removeChild(el.firstChild)
    }
}
