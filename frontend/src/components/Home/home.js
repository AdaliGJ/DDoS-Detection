import React, {useContext} from 'react';
import './home.css'
import NavBar from '../NavBar/navBar';



class Home extends React.Component{
    
    state = {
        dpi_usuario: null,
        tipo_usuario: null,
        baseUrl: 'http://localhost/webimages/'
    };
    
    componentDidMount(){
        
        
    }
    
    render(){
        return(
            <div>
                <NavBar/>
                <div className="page">
                    <h1>HEY</h1>
                    
                </div>
            </div>
        );
    }
}

export default Home;