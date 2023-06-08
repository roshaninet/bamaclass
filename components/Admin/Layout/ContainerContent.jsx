import styles from '@/scss/modules/panel.module.scss';

const ContainerContent = ({title, children, right, left, total, abs}) => {
    return (
        <div className='row'>
            <div className='col-12 py-4'>
                <div className='row'>
                    {
                        left && <div className='col-auto align-self-center'>{left}</div>
                    }
                    <div className='col align-self-center'>
                        <h1 className='fw-bold font-18 mb-0'>{title} {total ? `( ${total} )` : ''}</h1>
                    </div>
                    {
                        right && <div className='col-auto align-self-center'>{right}</div>
                    }
                </div>
            </div>
            <div className='col-12'>
                {children}
            </div>

            {abs && <div className={styles.absButton}>{abs}</div> }

        </div>
    )
}

export default ContainerContent;