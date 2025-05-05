import './App.css';

import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { selectContacts } from './redux/selectors';
import Loader from './components/Loader/Loader';

const ContactForm = lazy(() => import('./components/ContactForm/ContactForm'));
const SearchBox = lazy(() => import('./components/SearchBox/SearchBox'));
const ContactList = lazy(() => import('./components/ContactList/ContactList'));

function App() {
  const { loading, error } = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <Suspense fallback={<Loader />}>
        <ContactForm />
        <SearchBox />
        {loading && <Loader />}
        {error && <p>Can't load contacts at the moment</p>}
        {!loading && !error && <ContactList />}
      </Suspense>
    </div>
  );
}

export default App;