import axios from "axios";

const apiRequest = (searchTerm:string,page:number) => {
    return  axios
    .get( `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`)
    .then((res)=> res.data)
    .catch((error)=> console.log(error));
};



export{
    apiRequest
}