import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import moon from "./images/moon.png";
import Main from './pages/Main/index.jsx';
import FavCharacters from './pages/FavoriteCharacters/index.jsx';

function App() {
    return (
        <HashRouter>
            <div className="App">
                <div className="background_container">
                    <img src={moon} className="moon" alt="moon" />
                    <div className="stars"></div>
                    <div className="twinkling"></div>
                    <div className="clouds"></div>
                </div>
                <Header />
                <Switch>
                    <Route path='/FavCharacters' render={() => <FavCharacters />} />
                    <Route path='/' render={() => <Main />} />
                </Switch>
            </div>
        </ HashRouter>
    );
}

export default App;
