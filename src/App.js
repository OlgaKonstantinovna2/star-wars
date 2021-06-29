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
            <div class="background_container">
                <img src={moon} className="moon" alt="moon" />
                <div class="stars"></div>
                <div class="twinkling"></div>
                <div class="clouds"></div>
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
