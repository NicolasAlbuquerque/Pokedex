const pokemonName=document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image');
const form= document.querySelector('.form')
const input= document.querySelector('.input__search')
const buttonPrev=document.querySelector('.btn-prev')
const buttonNext= document.querySelector('.btn-next')
let searchPokemon=1
const pokedex=document.querySelector('.pokedex')
const botaoAlterarTema = document.getElementById
("botao-alterar-tema")
const corpo = document.querySelector('body')
const imagemBotaoTrocarDeTema = document.querySelector('.imagem__botao')

botaoAlterarTema.addEventListener('click', () =>{
    const modoEscuroAtivo=corpo.classList.contains('tema__escuro')
    corpo.classList.toggle('tema__escuro')
    if(modoEscuroAtivo){
        imagemBotaoTrocarDeTema.setAttribute('src', '/imagens/sunn-01.png')
        pokedex.setAttribute('src','/imagens/pokedexDia.png')
    }else{
        imagemBotaoTrocarDeTema.setAttribute('src', '/imagens/moon-01-01.png')
        pokedex.setAttribute('src', '/imagens/pokedexnoite-01.png')
    }
})


const fetchPokemon = async (pokemon) => {

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIresponse.status==200){
        const data= await APIresponse.json()
    return data
    }
    
}

const renderPokemon = async (pokemon)=>{

    pokemonName.innerHTML='Loading...'
    pokemonNumber.innerHTML=''
    const data= await fetchPokemon(pokemon)

    if(data){
        pokemonName.innerHTML=data.name;

    pokemonNumber.innerHTML=data['id'];


    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value=''//limpando o input
    searchPokemon=data.id
    }else{

        pokemonName.innerHTML='Not-Found ';
        input.value=''//limpando o input
        pokemonImage.style.display='none'
    }

}

form.addEventListener('submit',(event)=>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click',() => {
    
    if(searchPokemon >1){
         searchPokemon-=1
    renderPokemon(searchPokemon)
    }
   
})

buttonNext.addEventListener('click', () => {
searchPokemon+=1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)