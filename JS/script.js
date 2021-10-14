//click to start the async function: works
document.getElementById("search").addEventListener("click", pokeJSON);
/* TODO: figure out form submission.
figure out how to make it work when people click enter in the form.
document.getElementById("input").addEventListener('keypress', function pokeJSON (e){
    if (e.key === 'Enter') {
}
})*/
// define all the object locations where information needs to be changed based on api response.
let pokeId = document.getElementById("pokeId");
let pokeName = document.getElementById("pokeName");
let pokeSprite = document.getElementById("sprite");
let pokeDown = document.getElementById("spriteDown");
let pokeUp = document.getElementById("spriteUp");
//let nameDown = document.getElementById("spriteDown").setAttribute(tooltip).value;
//let nameUp = document.getElementById("spriteUp").setAttribute(tooltip).value;


let move1 = document.getElementById("move1");
let move2 = document.getElementById("move2");
let move3 = document.getElementById("move3");
let move4 = document.getElementById("move4");

let input;
let data;
let fetchpoke;
let response;
let moves;

async function pokeJSON() {
    //make the input be pasted to the end of the api url to ge the necessary corresponding data.
    //first of all let's work with the textdata
    input = document.getElementById("input").value;
    //get input value and use it to get to the needed url with the data for the pokemon.
    fetchpoke =  "https://pokeapi.co/api/v2/pokemon/"+input;
    //appers to work for now
    response = await fetch(fetchpoke);
    // fetch the data
    data = await response.json();
    //make the data workable
    //console.log(data);
    moves = await data.moves;
    //get moves & other specifications

    //this is where we change the data based on api response: staring with name, id and sprite
    pokeName.innerText = data.name;
    pokeId.innerText = data.id;
    pokeSprite.src = data.sprites.front_default;
    //below we have the logic for available moves. for now we only display the first 4 moves of the moves array.
    //or none or one in case of ditto. Hardcoded, not pretty.
    //if is for next gen: eg. mr rime
    if (moves[0] === undefined) {
        move1.innerText = "";
        move2.innerText = "";
        move3.innerText = "";
        move4.innerText = "";
    }//else if is for ditto
    else if (moves[1] === undefined){
        move2.innerText = "";
        move3.innerText = "";
        move4.innerText = "";
    }
    else {
        move1.innerText = moves[0].move.name;
        move2.innerText = moves[1].move.name;
        move3.innerText = moves[2].move.name;
        move4.innerText = moves[3].move.name;
    }
    //after all that we try and get the corresponding previous evolution if one exists.
    //hopefully we can also display next evos by the end of the exercise.
    fetchSpecJSON()
}
//define all needed variables for the spriteDown fetch.
let fetchdown;
let downfrom;
let fetchspec;
let specCheck;
let specdata;
let chain;

//to get the lower evo we need to pass by the species of the pokemon. then go check in the array.
async function fetchSpecJSON() {

    fetchspec = data.species.url;

    console.log(fetchspec);

    specCheck = await fetch(fetchspec);

    console.log(specCheck);

    specdata = await specCheck.json();

    console.log(specdata);

    chain = await specdata.evolution_chain.url;

    console.log(chain);

    await fetchChain();

    if (specdata.evolves_from_species === null) {
        pokeDown.src = "https://img1.pnghut.com/7/13/17/q07VEEvcKJ/business-deviantart-stock-ball-education.jpg"
    }
    else {
        downfrom = specdata.evolves_from_species.name
        fetchdown = "https://pokeapi.co/api/v2/pokemon/"+downfrom
        await fetchDown()
    }
    console.log(downfrom)
}


async function fetchDown() {
    const downCheck = await fetch(fetchdown);
    console.log(downCheck);
    const downJSON = await downCheck.json();
    console.log(downJSON);
    let spriteDown = await downJSON.sprites.front_default;
    pokeDown.src = await spriteDown;
}

let upCheck;
let specUp;
async function fetchChain() {
    upCheck = await fetch (chain);
    console.log(upCheck);
    const upJSON = await upCheck.json();
    console.log(upJSON);
    if (chain.evolves_to[0] !== null) {
        specUp = chain.evolves_to[0].evolves_to[0].species.url;
        pokeUp.src = specUp;
    }
}




//below for getting further evo's too

/*
        async function fetchEvoJSON(){
            const evoCheck = await fetch(chain);
            console.log(evoCheck);
            const evodata = await evoCheck.json();
            console.log(evodata);
            console.log(evodata.chain);
            console.log(evodata.chain.species.name);
            console.log(evodata.chain.evolves_to[0]);
            console.log(evodata.chain.evolves_to[0].species.name);
            console.log(evodata.chain.evolves_to[0].evolves_to[0].species.name);
            let evo = evodata.chain
            console.log(evo)
            for (let i = 0; i<2; i++) {
                console.log(evo)
                evo += ".evolves_to[0]"
                console.log(evo)
                console.log(evo.species.url)
            }

            for(let i=0; i<=evodata.length; i++){
                console.log(evodata.chain.evolves_to.name)
            }
        }
        fetchEvoJSON()

    }
    */






