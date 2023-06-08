import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {numberToObject} from "@/lib/Functions";


class FaqForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            question: '',
            answer: '',
            priority: 0,
            active: true
        }

        this.state.path = 'faqs';
        this.state.data = data;
        this.state.empty = data;
    }

    render() {
        return (
            <ParentForm validated={this.state.validated} loader={this.state.loader} handleSubmit={this.handleSubmit}>
                <CustomControl
                    type='text'
                    id='question'
                    title='پرسش'
                    value={this.state.data.question}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    errorText={'لطفا نام منطقه را وارد نمایید.'}
                    isRequired={true}
                />


                <CustomControl
                    type='select'
                    id='priority'
                    title='ترتیب'
                    options={{'': '', ...numberToObject(20, 1)}}
                    value={this.state.data.priority}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />

                <CustomControl
                    type='select'
                    id='active'
                    title='وضعیت'
                    options={{false: 'غیر فعال', true: 'فعال'}}
                    value={this.state.data.active}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />


                <CustomControl
                    type='textarea'
                    id='answer'
                    title='پاسخ'
                    counter={2000}
                    value={this.state.data.answer}
                    className={`custom-input col-12`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />
            </ParentForm>
        )
    }
}

FaqForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default FaqForm;
