import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import classes from './App.module.scss';
import Header from './Header';
import ArticlesList from './ArticlesList';
import SelfItem from './SelfItem';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';
import NewArticle from '../NewArticle';
import EditArtcle from '../EditArtcle';
import pages from '../../accets/pagesConstants/pagesConstants';

const App = () => (
    <div className={classes.app}>
        <Router>
            <Header />
            <Route path={pages.newArticle} component={NewArticle}/>
            <Route path={pages.signUp} component={SignUp} />
            <Route path={pages.signIn} component={SignIn} />
            <Route path={pages.profile} component={Profile} />
            <Route path={pages.main} exact component={ArticlesList}/>
            <Route path={pages.articles} exact component={ArticlesList}/>
            <Route path='/articles/:slug'
                   exact
                   render={({ match }) => {
                     const { slug } = match.params;
                     return <SelfItem slug={slug}/>;
                   }}/>
            <Route path='/articles/:slug/edit'
                   render={() =>  <EditArtcle />}/>
        </Router>
    </div>);

export default App;