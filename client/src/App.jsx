import AppRouter from './components/AppRouter';
import {observer} from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import {Context} from './index';
import {check} from './http/userAPI';
import {Preloader} from './components/Preloader/Preloader';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading){
    return <Preloader/>
  }

  return (
      <div>
        <AppRouter/>
      </div>
  );
});

export default App;
