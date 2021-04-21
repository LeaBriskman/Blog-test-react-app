import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import { Route, Switch } from 'react-router-dom';
import FeedPage from './FeedPage/FeedPage';
import FaqPage from './FaqPage/FaqPage';
import UserPage from './UserPage/UserPage';

const App = () => {    
    return(
      <>
        <AppHeader />       
        <Switch>
          <Route path="/" component={FeedPage} exact />
          <Route path="/faq" component={FaqPage} />          
          <Route path="/profile" component={UserPage} />           
        </Switch>
    </>
    );
};

export default App;