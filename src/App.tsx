import { Page, Wrapper } from 'App.styles';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Switch } from 'react-router-dom';

import Loader from 'components/Loader';

import NotFound from './pages/NotFound';

const Exchange = React.lazy(() => import('pages/Exchange'));
const Main = React.lazy(() => import('pages/Main'));

function App() {
  return (
    <Page>
      <Wrapper>
        <ErrorBoundary fallback={<span>Error</span>}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/exchange" exact component={Exchange} />
              <Route path="/" exact component={Main} />
              <Route component={NotFound} path="*" />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Wrapper>
    </Page>
  );
}

export default App;
