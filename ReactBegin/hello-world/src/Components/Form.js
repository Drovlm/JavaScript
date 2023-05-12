import React, { Component } from 'react'

class Form extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         username: '', 
         comments: '',
         topic: 'react'
      }
    }
    
    handleUsernameChange = (event) => {
        this.setState ({
            username: event.target.value
        })
    }

    handleCommentsChange = event => {
        this.setState({
            comments: event.target.value
        })
    }

    handleTopicChange = event => {
        this.setState({
            topic: event.target.value
        })
    }

    handleSubmit = event => {
        alert(`${this.state.username} ${this.state.comments} ${this.state.topic}`)
        event.preventDefault()
    }

  render() {
    return (
     <form onSubmit={this.handleSubmit}>
        <div>
            <lable>Username</lable>
            <input type= "text" value={this.state.username}
            onChange={this.handleUsernameChange}/>
        </div>

        <div>
            <lable>Comments</lable>
            <textarea value={this.state.comments}
            onChange={this.handleCommentsChange} />
            </div>

        <div>
            <lable>Topic</lable>
            <select value={this.state.topic}
            onChange={this.handleTopicChange}>
                <option value="react">React</option>
                <option value="angular">Angular</option>
                <option value="Vue">Vue</option>
            </select>
        </div>

        <button type="submit">Submit</button>
        
     </form>
    )
  }
}

export default Form
