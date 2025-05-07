import contactSVG from '../../assets/contact-calling-phone-svgrepo-com.svg'
import { useSelector } from "react-redux";
import { selectLoggedIn, selectUser } from "../../redux/auth/selectors";

const HomePage = () => {
  const isLoggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectUser);

  return isLoggedIn ? (
    <div>
      <h1 className="greet">Welcome back, {user.name || 'User'}!</h1>
    </div>
  ) : (
    <div>
      <h1 className="greet">Welcome!</h1>
      <img className="contact" src={contactSVG} alt="Contact" />
    </div>
  );
}

export default HomePage;