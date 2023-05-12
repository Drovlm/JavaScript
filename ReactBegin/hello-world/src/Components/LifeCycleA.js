import React, { Component } from 'react'
import LifeCycleB from './LifeCycleB'

class LifeCycleA extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         name: 'Mudar'
      }
      console.log('LifecycleA constructor')
    }
    
    static getDerivedStateFromProps(props, state){
        console.log('LifecycleA getDerivedStateFromProps')
        return null
    }

    componentDidMount(){
        console.log('LifecycleA componentDidMount')
    }

    shouldComponentUpdate(){
        console.log('LifecycleA shouldComponentUpdate')
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('LifecycleA getSnapshotBeforeUpdate')
        return null
    }

    conmponentdidUpdate(){
        console.log('LifecycleA conmponentdidUpdate')
    }

    changeState = () => {
        this.setState({
            name:'Codevolution'
        })
    }

  render() {
    console.log('LifecycleA render')
    return (
        <div>
      <div>Lifecycle A</div>
      <button onClick={this.changeState}>Change State</button>
      <LifeCycleB />
      </div>
    )
  }
}

export default LifeCycleA
