import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {ArrayComboToObject, numberToObject} from "@/lib/Functions";
import {CursePricing} from "@/lib/Data/Statics";


class CurseForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            title: '',
            userId: '',
            categoryId: '',
            description: '',
            discount: 0,
            priceType: '',
            price: 0,
            priority: 0,
            active: true,
            status: true
        }


        this.state.formData = true;
        this.state.files = ['file'];
        this.state.file = null;

        this.state.path = 'curses';
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
                        value={this.state.file || this.props.editItem?.image}
                        title='تصویر (500  * 500)'
                        onChange={(id, file) => this.setState({file: file})}
                        isRequired={true}
                    />
                </div>

                <CustomControl
                    type='text'
                    id='title'
                    title='عنوان دوره'
                    value={this.state.data.title}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    errorText={'لطفا نام منطقه را وارد نمایید.'}
                    isRequired={true}
                />


                <CustomControl
                    type='select'
                    id='userId'
                    title='استاد'
                    options={{'': '', ...ArrayComboToObject(this.props.teachers)}}
                    value={this.state.data.userId}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />

                <CustomControl
                    type='select'
                    id='categoryId'
                    title='دسته بندی'
                    options={{'': '', ...ArrayComboToObject(this.props.categories)}}
                    value={this.state.data.categoryId}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    errorText={'لطفا وضعیت را وارد نمایید.'}
                    isRequired={true}
                />

                <CustomControl
                    type='select'
                    id='priceType'
                    title='قیمت گذاری'
                    options={{'': '', ...CursePricing}}
                    value={this.state.data.priceType}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    isRequired={true}
                />

                {
                    this.state.data?.priceType > 2 ?
                        <>
                            <CustomControl
                                type='text'
                                id='price'
                                numberOnly={true}
                                pattern="\d+"
                                showString={true}
                                title='قیمت'
                                value={this.state.data.price}
                                className={`custom-input col-12 col-md-6`}
                                onChange={this.changeFormData}
                                errorText={'لطفا قیمت را وارد نمایید.'}
                                isRequired={true}
                            />
                            <CustomControl
                                id={'discount'}
                                type={'text'}
                                className={`custom-input col-12 col-md-6`}
                                value={this.state.data.discount}
                                pattern="[0-9]|[0-9][0-9]"
                                onChange={this.changeFormData}
                                isRequired={true}
                                numberOnly={true}
                                title={'تخفیف (درصد)'}/>
                        </> : null
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
                    id='status'
                    title='وضعیت'
                    options={{0: 'پیش نویس', 1: 'منتشر شده'}}
                    value={this.state.data.status}
                    className={`custom-input col-12 col-md-6`}
                    onChange={this.changeFormData}
                    errorText={'لطفا وضعیت را وارد نمایید.'}
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

CurseForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default CurseForm;
