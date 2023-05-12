import React, { Component } from 'react'
import Message from './Message'

class UserGreeting extends Component {

    constructor(props){
        super(props)
  
        this.state = {
          isLoggerIn: true
        }
      }

  render() {
    if (this.state.isLoggerIn){
        return(
            <div> Welcome Mudar </div>
        )
    }
    else {
        return(
            <div> Welcome Guest </div>
        )
    }}
    
    return () {
        let Message
        if (this.state.isLoggerIn){
            Message = <div> Welcome Mudar </div>
        } else {
            Message = <div> Welcome Guest </div>
        }
        return <div>{}Message</div>
        }
    
      //  <div>
        //    <div> Welcome Mudar </div>
          //  <div> Welcome Guest </div>
        // </div>
 //   ) 
  }


export default UserGreeting
