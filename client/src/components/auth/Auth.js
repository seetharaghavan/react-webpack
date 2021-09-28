import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions';
import { REQUEST_LOG_IN } from '../../types';

const Auth = () => {
  const [loginInfo, setLoginInfo] = React.useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({ field: null, message: "" });

  const authState = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const setFormValue = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm(loginInfo)) {
      dispatch({ type: REQUEST_LOG_IN });
      setTimeout(() => {
        dispatch(login(loginInfo));
      }, 1000);
    } else {
      return;
    }
  };

  const ValidateForm = (loginInfo) => {
    const { userName, password } = loginInfo;
    let isValid = false;
    if (userName.length === 0) {
      setErrors((prev) => ({
        ...prev,
        field: "userName",
        message: "Enter valid user name",
      }));
      return isValid;
    } else if (password.length === 0) {
      setErrors((prev) => ({
        ...prev,
        field: "password",
        message: "Enter valid password",
      }));
      return isValid;
    } else {
      isValid = true;
      setErrors((prev) => ({ ...prev, field: null, message: "" }));
    }
    return isValid;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          value={loginInfo.userName}
          name="userName"
          onChange={setFormValue}
          data-testid="userName"
          required
        />
        {errors.field === "userName" && (
          <small className="form-text text-danger">{errors.message}</small>
        )}
      </div>
      <div className="form-group">
        <label>Password *</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          value={loginInfo.password}
          name="password"
          onChange={setFormValue}
          data-testid="password"
          required
        />
        {errors.field === "password" && (
          <small className="form-text text-danger">{errors.message}</small>
        )}

        {authState.err && (
          <small className="form-text text-danger">{authState.err}</small>
        )}
      </div>
      {authState.isLoading ? (
        <div date-testid="loading">Loading</div>
      ) : (
        <button type="submit" data-testid="auth-submit" className="btn btn-primary">
          Submit
        </button>
      )}
    </form>
  );
};

export default Auth; 
