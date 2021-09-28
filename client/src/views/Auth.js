import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../components/auth/Auth';
import { me } from '../services/actions';

const AuthView = ({history}) => {
  const authState = useSelector(state => state.authState); 
  const dispatch = useDispatch(); 
  React.useEffect(() => {
    if(authState.isLoggedIn){
      history.push('/notes'); 
    } else {
      let token = localStorage.getItem('token'); 
      if(token) dispatch(me())
    }
  }, [authState, dispatch])

  return (
    <div className="container mt-60" style={{flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <div className="row">
        <div className="col-md-4 md-offset-6">
          <h3>Login </h3>
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default AuthView; 
