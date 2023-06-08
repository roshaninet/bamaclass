import styles from '@/scss/modules/panel.module.scss';
import icons from "@/scss/modules/icons.module.scss"

const FilterContainer = ({show, children, close}) => {
    return (
        <div className={`border border-primary w-100 bg-white mb-3 px-3 pt-3 rounded position-relative shadow ${styles.filterContainer} ${show ? 'd-block' : 'd-none'}`}>
            {children}
            <button className={`${styles.btnClose} bg-danger text-light shadow`} onClick={close}>
                <i className={icons.shQuit} />
            </button>
        </div>
    )
}

export default FilterContainer;