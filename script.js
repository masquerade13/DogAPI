let apikey = "live_hkF2YkuClG8VqirTzjaSHsFPdnqdeZaO9oD7ojRwn6gei28OAParWn9x2CDTfuAe";
let options = {
    method: "GET",
    headers: { "x-api-key": apikey }
};


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    headers: myHeaders,
    redirect: 'follow'
};


var kuchbhi;

fetch("https://api.thedogapi.com/v1/breeds?limit=1000&page=0", requestOptions, options)
    .then(response => response.json())
    .then(result => {
        // console.log(result);

        kuchbhi = result;
        // let forID = 0;
        // console.log(result);
        for (let index = 0; index < result.length; index++) {
            const element = result[index].name;
            let optinHTML = `<option id="optn-dogs-` + index + `" value="` + index + `" > ` + element + `</option>`;
            document.getElementById("optn-dogs").innerHTML += optinHTML;
            document.getElementById("optn-search-dogs").innerHTML += optinHTML;
        }
        // for (let index = 0; index < result.length; index++) {
        //     const element = result[index].name;
        //     let optinHTML = `<option id="optn-dogs-` + index + `" value="` + index + `" > ` + element + `</option>`;
        // }
    })
    .catch(error => console.log('error', error));


function breedDisplayer(valu) {
    var dogDisplay = document.getElementById("dog-data");
    dogDisplay.innerHTML = "";
    // console.log("Value is: " + valu);
    let k = kuchbhi[valu];
    // console.log(k.name + " " + k.id + " " + k.temperament + " " + k.weight.imperial + " " + k.height.metric) ;
    // console.log(kuchbhi[valu]);

    for (let ind = 1; ind < 7; ind++) {

        fetch("https://api.thedogapi.com/v1/images/search", requestOptions, options)
            .then(response1 => response1.json())
            .then(result1 => {
                // console.log(result1[0].url);
                document.getElementById("imgss-" + ind + "").src = "" + result1[0].url + "";
            })
            .catch(error => console.log('error', error));
    }

    dogDisplay.innerHTML = `<div class="mai-name">${k.name}</div> 
                            <div class="mai-id">id : ${k.id}</div> 
                            <div class="mai-other">---<br>${k.temperament} <br> ${k.weight.imperial} kgs <br> ${k.height.metric} cm at the withers <br> ${k.life_span} Years</div>`
}

let imgId;
let imgUrl;
randomGen();
function randomGen() {

    fetch("https://api.thedogapi.com/v1/images/search", requestOptions, options)
        .then(response => response.json())
        .then(result => {
            var favIt = document.getElementById("fav-it");
            favIt.innerHTML = "FAV IT";
            favIt.style.backgroundColor = "green";
            favIt.onclick = favAdder;
            imgId = result[0].id;
            imgUrl = result[0].url;
            let optinHTML = `<img class="imagesss" id="` + result[0].id + `" src="` + result[0].url + `" alt="" loading="lazy" alt="…" >`;
            document.getElementById("img-containera").innerHTML = optinHTML;
        })
        .catch(error => console.log('error', error));
    document.getElementById("hearta").style.display = "none";
}

let favDogs = [];
let favDogsUrl = [];

function favRemover() {
    let adder = document.getElementById("whole-grid-manager");
    var favIt = document.getElementById("fav-it");
    favDogs.pop();
    favDogsUrl.pop();
    favIt.innerHTML = "FAV IT";
    favIt.style.backgroundColor = "green";
    favIt.onclick = favAdder;
    document.getElementById("hearta").style.display = "none";
    favouriteTab();
}


function favAdder() {
    var favIt = document.getElementById("fav-it");
    favDogs.push(imgId);
    favDogsUrl.push(imgUrl);
    favIt.innerHTML = "UNFAV IT";
    favIt.style.backgroundColor = "red";
    favIt.onclick = favRemover;
    document.getElementById("hearta").style.display = "block";
    favouriteTab()
}

function favIndexedRemover(img_in) {
    let adder = document.getElementById("whole-grid-manager");
    var favIt = document.getElementById("fav-it");
    favDogs.splice(img_in, 1);
    favDogsUrl.splice(img_in, 1);
    document.getElementById("hearta").style.display = "none";
    favIt.innerHTML = "FAV IT";
    favIt.style.backgroundColor = "green";
    favouriteTab()
}

function favouriteTab() {

    let adder = document.getElementById("whole-grid-manager");
    // if (favDogsUrl.length != 0) {
    let favHTMLAdder = "";
    for (let img_in in favDogsUrl) {
        const element = favDogsUrl[img_in];
        // console.log(element);
        // console.log(img_in);

        favHTMLAdder += `<div class="per-img"> <img class="small-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"> <div onclick="favIndexedRemover(` + img_in + `)" class="small-unfav">UNFAV IT</div></div>`;
        // console.log(favHTMLAdder);
    }
    adder.innerHTML = favHTMLAdder;
    return
    // }
}

function breedDisplayerAsc(vall) {
    let adder = document.getElementById("whole-grid-manager");
    let favHTMLAdder = "";

    if (vall == 2) {
        for (let index = favDogsUrl.length - 1; index >= 0; index--) {
            const element = favDogsUrl[index];
            console.log(favDogsUrl);
            favHTMLAdder += `<div class="per-img"> <img class="small-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"> <div onclick="favIndexedRemover(` + index + `)" class="small-unfav">UNFAV IT</div></div>`;
        }
        adder.innerHTML = favHTMLAdder;
    }

    if (vall == 1) {
        for (let img_in in favDogsUrl) {
            const element = favDogsUrl[img_in];
            // console.log(element);
            // console.log(img_in);

            favHTMLAdder += `<div class="per-img"> <img class="small-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"> <div onclick="favIndexedRemover(` + img_in + `)" class="small-unfav">UNFAV IT</div></div>`;
            // console.log(favHTMLAdder);
        }
        adder.innerHTML = favHTMLAdder;
    }
    return;
}



var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    document.querySelector(".inside-abs").style.display = "none";
};


let newSize = 9;
function howManyimg(vl) {
    console.log(vl);
    newSize = vl;
    searchTab();
}

// let newfavSize = 9;
// function howManyimg(vl1) {
//     console.log(vl1);
//     newfavSize = vl1;
//     favouriteTab();
// }




function searchTab() {
    let adde = document.getElementById("whole-grid-search-manager");
    let searchHTMLAdder = "";
    fetch("https://api.thedogapi.com/v1/breeds?limit=1000&page=0", requestOptions, options)
        .then(resnse => resnse.json())
        .then(reslt => {
            // console.log(reslt);
            for (let index = 0; index < newSize; index++) {
                const element = reslt[index].image.url;
                // console.log("image url number is "+index+ "and url is" + element);
                searchHTMLAdder += `<div class="pera-img"> <img class="smalll-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"></div>`;
            }
            adde.innerHTML = searchHTMLAdder;
        })
        .catch(error => console.log('error', error));
    return;
}

searchTab();

let favDogsGifUrl = [];

function fileStorage() {
    let adde = document.getElementById("whole-grid-search-manager");
    let searchHTMLAdder = "";

    for (let index = 0; index < 50; index++) {
        fetch("https://api.thedogapi.com/v1/images/search", requestOptions, options)
            .then(resnse1 => resnse1.json())
            .then(reslt1 => {
                // console.log(reslt1[0].url);
                if (reslt1[0].url.includes(".gif")) {
                    favDogsGifUrl.push(reslt1[0].url);
                    console.log("what is this? " + favDogsGifUrl[index]);
                }
                else {
                    return;
                }
            })
            .catch(error => console.log('error', error));
    }
}



function fileType(vala) {
    let adde = document.getElementById("whole-grid-search-manager");
    let searchHTMLAdder = "";
    start:
    fetch("https://api.thedogapi.com/v1/images/search", requestOptions, options)
        .then(resnse1 => resnse1.json())
        .then(reslt1 => {

            if (vala == 1) {
                searchTab();
            }
            if (vala == 2) {
                // console.log("DesFilter working")
                // console.log(reslt1);
                // for (let index = (reslt1.length - 1); index > 0; index--) {
                searchTab();
            }
            if (vala == 3) {
                fileStorage();
                console.log("third working");
                for (let index = 0; index < 9; index++) {
                    const element = favDogsGifUrl[index];
                    // console.log(element);
                    searchHTMLAdder += `<div class="pera-img"> <img class="smalll-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"></div>`;
                }
                adde.innerHTML = searchHTMLAdder;
            }
        })
        .catch(error => console.log('error', error));
    return;
}

function AscFilter(vala) {
    let adde = document.getElementById("whole-grid-search-manager");
    let searchHTMLAdder = "";
    fetch("https://api.thedogapi.com/v1/breeds?limit=1000&page=0", requestOptions, options)
        .then(resnse1 => resnse1.json())
        .then(reslt1 => {
            // console.log(reslt1);
            if (vala == 1) {
                // for (let index = 0; index < reslt1.length; index++) {
                for (let index = 0; index < 9; index++) {
                    const element = reslt1[index].image.url;
                    // console.log("image url number is " + index + "and url is" + element);
                    searchHTMLAdder += `<div class="pera-img"> <img class="smalll-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"></div>`;
                }
                adde.innerHTML = searchHTMLAdder;
            }
            if (vala == 2) {
                // console.log("DesFilter working")
                // console.log(reslt1);
                // for (let index = (reslt1.length - 1); index > 0; index--) {
                for (let index = (reslt1.length - 1); index > (reslt1.length - 10); index--) {
                    // console.log(reslt1[index].image.url + "Round");
                    const element = reslt1[index].image.url;
                    searchHTMLAdder += `<div class="pera-img"> <img class="smalll-grd-images" style="width: 200px;height: 130px;object-fit: cover;" src="` + element + `" alt="" loading="lazy"></div>`;
                }
                adde.innerHTML = searchHTMLAdder;
            }
        })
        .catch(error => console.log('error', error));
    return;
}
