import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-recipe-d9a37.firebaseio.com/'
});

export default instance;