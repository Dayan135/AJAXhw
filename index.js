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
    console.log(await response.json())
}
