import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {numberToObject} from "@/lib/Functions";


class IndexForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            title: '',
            curseId: props.curseId,
            priority: 0,
            active: true
        }

        this.state.path = 'indices';
        this.state.data = data;
        this.state.empty = data;
    }

    render() {
        return (
            <ParentForm validated={this.state.validated} loader={this.state.loader} handleSubmit={this.handleSubmit}>
                <CustomControl
                    type='text'
                    id='title'
                    title='عنوان'
                    value={this.state.data.title}
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
            </ParentForm>
        )
    }
}

IndexForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default IndexForm;
