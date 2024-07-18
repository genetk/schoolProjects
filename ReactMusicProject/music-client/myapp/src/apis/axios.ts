import axios from 'axios' 
const token= localStorage.getItem('token')
console.log(token)
export default axios.create({
  
    baseURL:'http://localhost:9000/',

    headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
    }
});