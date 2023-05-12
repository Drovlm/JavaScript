import React from 'react'
import Person from './Person'

function NameList() {
    const names = ['Bruse', 'Mudar', 'Lela', 'Bruse']
    const persons = [
        {
            id: 1,
            name: 'Bruse',
            age: 30,
            skills: 'Reacr'
        },
        {
            id: 2,
            name: 'Mudar',
            age: 23,
            skills: 'PHP'  
        },
        {
            id: 3,
            name: 'Lela',
            age: 25,
            skills: 'Angular'
        }
    ]
    
    const NameList = names.map((name, index) => <h2 key={index}>{index} {name}</h2>)
        return ( <div> {NameList} </div> )
}

export default NameList
