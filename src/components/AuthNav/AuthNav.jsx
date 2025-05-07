import classNames from "classnames";
import { NavLink } from "react-router-dom";
import css from './AuthNav.module.css';

const getLinkStyle = ({ isActive }) => 
  classNames(css.link, {
    [css.isActive]: isActive
  });

const AuthNav = () => {
  return (
    <div>
      <NavLink to="/register" className={getLinkStyle}>
        Register
      </NavLink>
      <NavLink to="/login" className={getLinkStyle}>
        Log in
      </NavLink>
    </div>
  );
}

export default AuthNav;