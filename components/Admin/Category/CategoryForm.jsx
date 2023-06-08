import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {numberToObject} from "@/lib/Functions";


class CategoryForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            title: '',
            slug: '',
            description: '',
            priority: 0,
            parentId: props.parentId || '',
            active: true
        }


        this.state.formData = true;
        this.state.files = ['file'];
        this.state.file = null;

        this.state.path = 'categories';
        this.state.data = data;
        this.state.empty = data;
    }

    render() {
        return (
            <ParentForm validated={this.state.validated} loader={this.state.loader} handleSubmit={this.handleSubmit}>
                <div className='col-12'>
                    <CustomControl
                        className={`custom-input col-12 col-md-8`}
                        id='file'
                        pattern="image"
                        type='image'
                        value={this.state.file || this.props.editItem?.icon}
                        title='تصویر (500  * 500)'
                        onChange={(id, file) => this.setState({file: file})}
                        isRequired={true}
                    />
                </div>

                <CustomControl
                    type='text'
                    id='title'
                    title='نام دسته بندی'
                    value={this.state.data.title}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    errorText={'لطفا نام منطقه را وارد نمایید.'}
                    isRequired={true}
                />

                <CustomControl
                    type='text'
                    id='slug'
                    title='اسلاگ (به انگلیسی)'
                    pattern={"^[a-z][a-z0-9\\-]+$"}
                    numberOnly={true}
                    errorText='لطفا اسلاگ را در قالب کاراکتر های انگلیسی و اعداد وارد نمایید .'
                    value={this.state.data.slug}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
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
                    errorText={'لطفا وضعیت را وارد نمایید.'}
                    isRequired={true}
                />


                <CustomControl
                    type='textarea'
                    id='description'
                    title='توضیحات'
                    counter={2000}
                    value={this.state.data.description}
                    className={`custom-input col-12`}
                    onChange={this.changeFormData}
                    errorText={'لطفا نام منطقه را وارد نمایید.'}
                    isRequired={true}
                />
            </ParentForm>
        )
    }
}

CategoryForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default CategoryForm;
