import './App.css';

import { Page, Wrapper } from 'App.styles';
import { Route, Switch } from 'react-router-dom';

import Main from 'pages/Main';

// import { Counter } from './features/counter/Counter';
import Exchange from './pages/Exchange';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Page>
      <Wrapper>
        {/* <Counter /> */}
        <Switch>
          <Route path="/exchange" exact component={Exchange} />
          <Route path="/" exact component={Main} />
          <Route component={NotFound} path="*" />
        </Switch>
      </Wrapper>
    </Page>
  );
}

export default App;
