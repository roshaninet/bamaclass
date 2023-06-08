import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {numberToObject} from "@/lib/Functions";
import {UserRoles} from "@/lib/Data/Statics";
import ContainerContent from "@/components/Admin/Layout/ContainerContent";
import {withRouter} from "next/router";


class UserForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            name: '',
            mobile: '',
            username: '',
            description: '',
            priority: 0,
            active: true
        }

        this.state.standAlone = true;
        this.state.formData = true;
        this.state.files = ['file'];
        this.state.file = null;

        this.state.path = 'users';
        this.state.data = data;
        this.state.empty = data;
    }

    render() {
        return (
            <ContainerContent title={'کاربر'}>
                <ParentForm validated={this.state.validated} loader={this.state.loader}
                            handleSubmit={this.handleSubmit}>
                    <div className='col-12'>
                        <CustomControl
                            className={`custom-input col-12 col-md-8`}
                            id='file'
                            type='image'
                            value={this.state.file || this.props.editItem?.image}
                            title='تصویر (500  * 500)'
                            onChange={(id, file) => this.setState({file: file})}
                            isRequired={true}
                        />
                    </div>

                    <CustomControl
                        type='text'
                        id='name'
                        title='نام و نام خانوادگی'
                        value={this.state.data.name}
                        className={`custom-input col-12 col-md-6`}
                        onChange={this.changeFormData}
                        isRequired={true}
                    />

                    <CustomControl
                        id={'mobile'}
                        type={'text'}
                        className={`custom-input col-12 col-md-6`}
                        value={this.state.data.mobile}
                        pattern="09[0-9]{9}"
                        onChange={this.changeFormData}
                        isRequired={true}
                        numberOnly={true}
                        errorText={'شماره موبایل ۱۱ رقمی را وارد کنید .'}
                        title={'شماره موبایل'}/>

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
                        type='select'
                        id='type'
                        title='نوع کاربری'
                        options={{'': '', ...UserRoles}}
                        value={this.state.data.type}
                        className={`custom-input col-12 col-md-6`}
                        onChange={this.changeFormData}
                        isRequired={true}
                    />

                    {
                        parseInt(this.state.data.type) === 2 ? <>
                            <CustomControl
                                type='text'
                                id='username'
                                title='نام کاربری (به انگلیسی)'
                                pattern={"^[a-z][a-z0-9\\-]+$"}
                                numberOnly={true}
                                errorText='لطفا اسلاگ را در قالب کاراکتر های انگلیسی و اعداد وارد نمایید .'
                                value={this.state.data.username}
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
                                type='textarea'
                                id='description'
                                title='توضیحات'
                                counter={2000}
                                value={this.state.data.description || ''}
                                className={`custom-input col-12`}
                                onChange={this.changeFormData}
                                errorText={'لطفا نام منطقه را وارد نمایید.'}
                                isRequired={true}
                            />
                        </> : null
                    }

                </ParentForm>
            </ContainerContent>
        )
    }
}

UserForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default withRouter(UserForm);
