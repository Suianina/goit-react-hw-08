import css from './Loader.module.css'

const Loader = () => {
    return(
        <div className={css.loader}>
            <p className={css.text}>loading...</p>
        </div>
    )
}
export default Loader