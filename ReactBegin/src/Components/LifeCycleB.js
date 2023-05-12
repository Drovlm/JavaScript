import React, { Component } from 'react'

class LifeCycleB extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         name: 'Mudar'
      }
      console.log('LifecycleB constructor')
    }
    
    static getDerivedStateFromProps(props, state){
        console.log('LifecycleB getDerivedStateFromProps')
        return null
    }

    componentDidMount(){
        console.log('LifecycleB componentDidMount')
    }

    shouldComponentUpdate(){
        console.log('LifecycleB shouldComponentUpdate')
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('LifecycleB getSnapshotBeforeUpdate')
        return null
    }

    conmponentdidUpdate(){
        console.log('LifecycleB conmponentdidUpdate')
    }

  render() {
    console.log('LifecycleB render')
    return (
      <div>Lifecycle B</div>
    )
  }
}

export default LifeCycleB
