import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {numberToObject} from "@/lib/Functions";


class SlideForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            title: '',
            mode: 1,
            itemType: 1,
            itemId: 0,
            priority: 0,
            active: true
        }


        this.state.formData = true;
        this.state.files = ['file'];
        this.state.file = null;

        this.state.path = 'slides';
        this.state.data = data;
        this.state.empty = data;
    }

    render() {
        return (
            <ParentForm validated={this.state.validated} loader={this.state.loader} handleSubmit={this.handleSubmit}>
                <div className='col-12'>
                    <CustomControl
                        pattern="slider"
                        className={`custom-input col-12`}
                        id='file'
                        type='image'
                        value={this.state.file || this.props.editItem?.image}
                        title={`تصویر (${parseInt(this.state.data.mode) === 2 ? `${parseInt(this.state.data.itemType) === 2 ? "160" : "256"}  * 700` : `${parseInt(this.state.data.itemType) === 2 ? "256" : "560"}  * 2000`})`}
                        onChange={(id, file) => this.setState({file: file})}
                        isRequired={true}
                    />
                </div>

                <CustomControl
                    type='text'
                    id='title'
                    title='عنوان اسلاید'
                    value={this.state.data.title}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    errorText={'لطفا نام منطقه را وارد نمایید.'}
                    isRequired={true}
                />


                <CustomControl
                    type='select'
                    id='mode'
                    title='نمایش'
                    options={{'': '', 1: "دسکتاپ", 2: "موبایل"}}
                    value={this.state.data.mode}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />

                <CustomControl
                    type='select'
                    id='itemType'
                    title='نوع'
                    options={{'': '', 1: "صفحه اصلی", 2: "دسته بندی"}}
                    value={this.state.data.itemType}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />
                {
                    parseInt(this.state.data.itemType) === 2 ? <CustomControl
                        type='select'
                        id='itemId'
                        title='دسته بندی'
                        options={{0: '', ...this.props.categories}}
                        value={this.state.data.itemId}
                        className={`custom-input col-12 col-md-6`}
                        onChange={this.changeFormData}
                        isRequired={true}
                    /> : null
                }


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
                    errorText={'لطفا وضعیت را وارد نمایید.'}
                    isRequired={true}
                />

            </ParentForm>
        )
    }
}

SlideForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default SlideForm;
