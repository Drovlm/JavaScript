import react, {Component} from 'react'

class Welcome extends Component {
    render (){
        const {name, nickname} = this.props
        //const {state1, state2} = this.state
        return <h1>Welcome {name}, {nickname}</h1>
    }
}

export default Welcome