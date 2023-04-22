import {Spinner} from "react-bootstrap";
import styles from  "@/scss/loader.module.scss";
export const Loader = () => {
    return (
        <div className='py-5 my-5 w-100'>
            <div className={styles.loader}>
                <Spinner animation="grow"  color='primary'/>
            </div>
        </div>

    )
}

export default Loader;