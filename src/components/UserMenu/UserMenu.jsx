import { useNavigate } from "react-router-dom";
import css from './UserMenu.module.css';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { logout } from "../../redux/auth/operations";


const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={css.box}>
      {user && user.name ? (
        <h3 className={css.text}>
          <FaRegUser className={css.icon} /> {user.name}
        </h3>
      ) : (
        <h3 className={css.text}>
          <FaRegUser className={css.icon} /> Guest
        </h3>
      )}
      <button type="button" className={css.btn} onClick={logOut}>
        <CiLogout /> Log Out
      </button>
    </div>
  );
}

export default UserMenu;