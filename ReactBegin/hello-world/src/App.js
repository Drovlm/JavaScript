import logo from './logo.svg';
import {Greet} from './Components/Greet';
import './App.css';
import Welcome from './Components/Welcome';
import Hello from './Components/Hello';
import { Children, Component } from 'react';
import Message from './Components/Message';
import Counter from './Components/Counter';
import FunctionClick from './Components/FunctionClick';
import ClassClick from './Components/ClassClick';
import EventBind from './Components/EventBind';
import ParentComponent from './Components/ParentComponent';
import UserGreeting from './Components/UserGreeting';
import NameList from './Components/NameList';
import Stylesheet from './Components/Stylesheet';
import Inline from './Components/Inline';
import './AppStyle.css'
import styles from './AppStylesMod.css'
import Form from './Components/Form';
import LifeCycleA from './Components/LifeCycleA';
import FragmentDemo from './Components/FragmentDemo';
import Table from './Components/Table';
import RafsDemo from './Components/RafsDemo';
import FocusInput from './Components/FocusInput';
import FRParentInput from './Components/FRParentInput';

class App extends Component{
  render(){
    return (
      <div className="App">
        <FRParentInput />
      <FocusInput />
        <RafsDemo />
        {/*<Table />*/}
        <FragmentDemo />
        <LifeCycleA />
      <Form />
    {/*}  <h1 className='error'>Error</h1>
      <h1 className='success'>Success</h1>*/}
       {/* <Stylesheet primary={true} />*/}
        {/*<Inline />*/}
      {/*<NameList />*/}
      {/*<UserGreeting />*/}
        {/*<ParentComponent />*/}
       {/* <EventBind />*/}
       {/* <FunctionClick />
        <ClassClick />*/}

       {/* <Counter />*/}

     { /*<Message>
        <button>Subscribe</button>
      </Message>

      <br></br>*/}

      {/* <Greet name="Mudar" nickname="Drovlm">
      <p>This is man</p>
      </Greet>
        <Greet name="Mark" nickname="Maro">
        <button>Click here</button>
    </Greet>*/}
      {/*<Greet name="Diana" nickname="Dedo"/>

      <br></br>

      <Welcome name="Mudar" nickname="Drovlm"/>
      {/*<Welcome name="Mark" nickname="Maro"/>
      <Welcome name="Diana" nickname="Dedo"/>*/}

        {/*<Hello />*/}
      </div>
    );

  }
}
 
export default App; 
