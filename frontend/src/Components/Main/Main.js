import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser, setURLs, deleteCurrentEvent} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import NearMe from '../NearMe/NearMe'
import MainPage from '../MainPage/MainPage'
import Event from '../Event/Event'
import baseUrl from '../../Shared/baseUrl'
import axios from 'axios'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
		urls: state.urls
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
	setURLs: (data) => { dispatch(setURLs(data))},
	deleteCurrentEvent: () => { dispatch(deleteCurrentEvent())}
});



class Main extends Component {

    constructor(props){
        super(props);

		axios.get(baseUrl).then((response) => {
			this.props.setURLs(response.data);
		})
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
		this.props.deleteCurrentEvent();
    }

    render(){
        return(
            <div>
				<Navbar />
                {/* {this.props.token.token !== undefined ?
                            <Redirect to='/home'/>
                    : 
                      <Redirect to='/home'/>  
                } */}
                <Switch>
                    <Route path='/login' component={this.props.token.token !== undefined ? () => <Home/> : () => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
					{this.props.token.token !== undefined ? <Route path='/nearme'component={() => <NearMe />}/> : <Redirect to='/login/'/> }
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : () => <MainPage/>}/>
					{this.props.token.token !== undefined ? <Route path='/event' component={() => <Event />}/> : <Redirect to='/login/' /> }
                    <Redirect to='/home'/>
                </Switch>
				<Footer />
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));