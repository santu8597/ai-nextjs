import { it } from 'node:test'
import React from 'react'

export default function page() {
    let data=[{
        "id": 1,
        "name": "John Doe",
        "email": "santup205@gmail.com"
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "email": "khkf"
    },{
        "id": 3,
        "name": "John Smith",
        "email": "dcds"
    }
    



]
 data=data.filter((item) => {
    if(item.id === 1) {
        return true
    }
})
// data=data.filter((item) => item.id === 1)
const getdata=async ()=>{
  const res= await fetch('https://jsonplaceholder.typicode.com/users',{
    method:'GET',
   
    headers:{
        'Content-Type':'application/json',
        "Authorization":"Bearer kfbhegkjhekgekjghekjhe85645854"
    },
    body:JSON.stringify({
        id:1, })
  })
  const data=await res.json()
  setData(data)

}

  return (
    <div>
      {/* {data.map((item) => {
        return (
            <div key={item.id}>
                <h1>{item.name}</h1>
                <p>{item.email}</p>
            </div>
            )
        }
        )
      } */}
      {data.map((item)=>{
       return (
        <>
        <div>{item.id}</div>
        <div>{item.name}</div></>
       ) 
      })}
      

    </div>
  )
}
