import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/auth/selectors";

const getLinkStyles = ({isActive}) => 
  classNames(css.link, {
    [css.isActive]: isActive
  })


const Navigation = () => {
  const isLoggedIn = useSelector(selectLoggedIn)
  return (
    <div className={css.box}>
      <NavLink to="/" className={getLinkStyles}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={getLinkStyles} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};
export default Navigation