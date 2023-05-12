import React from 'react';

export const Greet = props => {
    const {name, nickname} = props
return (
    <div>
    <h1>Hello {name}, {nickname}</h1>
  
    </div>
) 
}

export default Greet;