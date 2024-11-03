import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CandidateProvider } from './context/SavedContext';

function App() {
  return (
    <>
      <Nav />
      <main>
        <CandidateProvider>
          <Outlet />
        </CandidateProvider>
      </main>
    </>
  );
}

export default App;
