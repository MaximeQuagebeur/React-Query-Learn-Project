import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/Home.page';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page';
import { SuperHeroesPage } from './components/SuperHeroes.page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import { DynamicParallelPage } from './components/DynamicParallel.page';
import DependantQueries from './components/DependantQueries.page';
import { PaginatedQueriesPage } from './components/PaginatedQueries.page';
import { InfiniteQueriesPage } from './components/InfiniteQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">Parallel Queries</Link>
              </li>
              <li>
                <Link to="/dynamic-parallel">Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to="/dependant-queries">Dependant Queries</Link>
              </li>
              <li>
                <Link to="/paginated-queries">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/infinite-queries">Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path={'/rq-super-heroes/:heroId'}>
              <RQSuperHeroPage />
            </Route>
            <Route path={'/infinite-queries'}>
              <InfiniteQueriesPage />
            </Route>
            <Route path={'/paginated-queries'}>
              <PaginatedQueriesPage />
            </Route>
            <Route path={'/dependant-queries'}>
              <DependantQueries email="vishwas@example.com" />
            </Route>
            <Route path={'/rq-parallel'}>
              <ParallelQueriesPage />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/dynamic-parallel">
              <DynamicParallelPage heroIds={[1, 3]} />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
