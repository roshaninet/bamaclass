import {Form, Spinner} from "react-bootstrap";

const ParentForm = ({validated, handleSubmit, loader, children, buttonText = "ثبت فرم", buttonPosition = "center"}) => {
    return (
        <Form className="row" noValidate validated={validated} onSubmit={handleSubmit}>
            {children}

            <div className={`col-12 py-4 text-${buttonPosition}`}>
                <button className='btn btn-primary rounded-pill px-5 btn-sm ' disabled={loader}>
                    {loader ? <Spinner animation="border" size="sm"/> : buttonText}
                </button>
            </div>
        </Form>
    )
}

export default ParentForm;