import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import Feed from './components/Feed';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Feed} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
};

export default App;