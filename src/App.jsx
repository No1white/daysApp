import React from 'react'
import  {BrowserRouter,Route,Switch} from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Home from "./pages/Home/Home";
import AddTask from "./pages/AddTask/AddTask";
import Note from "./pages/Note/Note";
import Record from "./pages/Record/Record";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddNote from "./pages/AddNote/AddNote";
import Schedule from "./pages/Schedule/Schedule";
import Settings from "./pages/Settings/Settings";
import Mine from "./pages/Mine/Mine";
class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = props;
        console.log(cookies)
        this.state = {
            sideBarSwitch:false,
            showNavBar:true
        }


    }
    // showSideBar() {
    //     console.log("触发")
    //     this.setState({
    //         sideBarSwitch:!this.state.sideBarSwitch
    //     })
    // }

    render() {
        return (
            <div style={{width:'100%'}}>


                <BrowserRouter >
                    {/*<Navbar handleClick={() => this.showSideBar()} ></Navbar>*/}
                    {/*{this.state.sideBarSwitch?<SideBar onShowSideBar={()=>this.showSideBar()}></SideBar>:null}*/}
                    <Switch>
                        <Route path={'/note'} component={Note}></Route>
                        <Route path={'/record'} component={Record}></Route>
                        <Route path={'/add_task'} component={AddTask}></Route>
                        <Route path={'/add_note'} component={AddNote}></Route>
                        <Route path={'/schedule'} component={Schedule}>
                        </Route>
                        <Route path={'/login'} component={Login}></Route>
                        <Route path={'/register'} component={Register}></Route>
                        <Route path={'/settings'} component={Settings}></Route>
                        <Route path={'/mine'} component={Mine}></Route>
                        <Route path={'/'} component={Home}></Route>

                    </Switch>

                </BrowserRouter>
                {/*<Home onShowSideBar={()=>this.showSideBar()}></Home>*/}
            </div>
        )
    }
}


export default withCookies(App);
