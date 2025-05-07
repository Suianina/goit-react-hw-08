import UserMenu from '../UserMenu/UserMenu'
import AuthNav from '../AuthNav/AuthNav'
import Navigation from '../Navigation/Navigation'
import css from './AppBar.module.css'
import { useSelector } from 'react-redux'
import {selectLoggedIn} from '../../redux/auth/selectors'

export const AppBar = () => {
    const isLoggedIn = useSelector(selectLoggedIn)
    return(
<div className={css.container}>
    <Navigation/>
{isLoggedIn ? <UserMenu/> : <AuthNav/>}
</div>
    )
}
export default AppBar