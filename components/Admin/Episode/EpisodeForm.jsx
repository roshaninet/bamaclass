import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {numberToObject} from "@/lib/Functions";
import {withRouter} from "next/router";
import ContainerContent from "@/components/Admin/Layout/ContainerContent";


class EpisodeForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            title: '',
            curseIndexId: props.router.query?.curseIndexId,
            description: '',
            priceType: 1,
            duration: '',
            priority: 0,
            active: true
        }

        this.state.redirectParams = props.router.query?.curseIndexId ? {
            curseIndexId:  props.router.query?.curseIndexId
        } : null

        this.state.standAlone = true;
        this.state.formData = true;
        this.state.files = ['file'];
        this.state.file = null;

        this.state.path = 'episodes';
        this.state.data = data;
        this.state.empty = data;
    }

    render() {
        return (
            <ContainerContent title={'قسمت'}>
                <ParentForm validated={this.state.validated} loader={this.state.loader}
                            handleSubmit={this.handleSubmit}>
                    <div className='col-12 col-md-7 my-3'>
                        <CustomControl
                            pattern="image"
                            className={`custom-input col-12`}
                            id='file'
                            type='image'
                            value={this.state.file || this.props.editItem?.image}
                            title='تصویر (500  * 720)'
                            onChange={(id, file) => this.setState({file: file})}
                            isRequired={true}
                        />
                    </div>

                    <CustomControl
                        type='text'
                        id='title'
                        title='عنوان'
                        value={this.state.data.title}
                        className={`custom-input col-12 col-md-6`}
                        onChange={this.changeFormData}
                        isRequired={true}
                    />

                    <CustomControl
                        type='select'
                        id='priceType'
                        title='قیمت گذاری'
                        options={{'': '', 1: "رایگان", 2: "غیر رایگان"}}
                        value={this.state.data.priceType}
                        className={`custom-input col-12 col-md-6`}
                        onChange={this.changeFormData}
                        isRequired={true}
                    />

                    <CustomControl
                        id={'duration'}
                        type={'text'}
                        className={`custom-input col-12 col-md-6`}
                        value={this.state.data.duration}
                        pattern="[1-9]|[0-9][0-9]|[0-9][0-9][0-9]"
                        onChange={this.changeFormData}
                        isRequired={true}
                        numberOnly={true}
                        title={'مدت زمان (دقیقه)'}/>

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
            </ContainerContent>
        )
    }
}

EpisodeForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default withRouter(EpisodeForm);
