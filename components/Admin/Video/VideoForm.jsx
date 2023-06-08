import PropTypes from "prop-types";
import BaseForm from "@/lib/Base/BaseForm";
import ParentForm from "@/components/Tools/ParentForm";
import CustomControl from "@/components/Tools/CustomControl";
import {withRouter} from "next/router";
import ContainerContent from "@/components/Admin/Layout/ContainerContent";
import VideoUpload from "@/components/Tools/VideoUpload";
import Requests from "@/lib/Requests";
import {AlertModal} from "@/components/Tools/AlertModal";
import {toast} from "react-toastify";
import {objectToQueryString} from "@/lib/Functions";


class VideoForm extends BaseForm {
    constructor(props) {
        super(props);
        const data = {
            episodeId: props.router.query?.episodeId,
            videoType: '',
            process: 0,
            videoPath: '',
            active: true
        }

        this.state.standAlone = true;
        this.state.redirectParams = props.router.query?.episodeId ? {
            episodeId: props.router.query?.episodeId
        } : null
        this.state.formData = true;
        this.state.files = ['file', 'video'];
        this.state.file = null;
        this.state.video = null;

        this.state.path = 'videos';
        this.state.data = data;
        this.state.empty = data;
    }

    async handleSubmit(event) {
        if (parseInt(this.state.data.videoType) !== 2) {
            await super.handleSubmit(event);
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.setState({validated: true});

        if (event.target.checkValidity()) {
            if (this.state.video) {
                const file = this.state.video;
                const chunkSize = 2 * 1024 * 1024; // 2MB (adjust as needed)
                const totalChunks = Math.ceil(file.size / chunkSize);
                let uploadedChunks = 0;

                let currents = [];
                const res = await Requests.getData('admin/videos/initial', {
                    fileName: file.name,
                    fileSize: file.size
                });

                if (res.success) {
                    currents = res.response;
                }

                uploadedChunks = currents.length;
                for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                    if (currents.indexOf(chunkIndex) > -1) {
                        console.log("yes");
                        // uploadedChunks++;
                    } else {
                        const start = chunkIndex * chunkSize;
                        const end = Math.min(start + chunkSize, file.size);
                        const chunk = file.slice(start, end);
                        this.setState({loader: true});

                        const videoFormData = new FormData();
                        videoFormData.append('file', chunk);
                        videoFormData.append('chunkIndex', chunkIndex.toString());
                        videoFormData.append('totalChunks', totalChunks.toString());
                        videoFormData.append('fileName', file.name);
                        videoFormData.append('fileSize', file.size);

                        try {
                            const res = await Requests.postFormData('admin/videos/chunks', videoFormData);
                            if (res.success) {
                                uploadedChunks++;
                            } else {
                                toast.error("خظا در برقراری ارتباط");
                                chunkIndex--;
                            }
                        } catch (error) {
                            console.error('Error uploading chunk:', error);
                            // Handle error and retry if needed
                        }
                    }

                    console.log(uploadedChunks, totalChunks, Math.ceil((uploadedChunks * 100) / totalChunks));
                    this.setState({
                        process: Math.ceil((uploadedChunks * 100) / totalChunks)
                    })
                }
                this.setState({loader: false});

                if (uploadedChunks === totalChunks) {
                    // All chunks uploaded, request merging
                    this.setState({loader: true});
                    let res;

                    let url = `admin/${this.state.path}`;
                    if (this.props.editItem) {
                        url = `admin/${this.state.path}/${this.props.editItem.id}`;
                    }

                    let formData = new FormData(event.target);
                    if (this.state.file) {
                        formData.append('file', this.state.file);
                    }

                    for (const f of Object.keys(this.state.data)) {
                        formData.append(f, this.state.data[f] || '');
                    }

                    if (this.props.editItem) {
                        formData.append('_method', 'PUT');
                    }

                    formData.append('fileName', file.name);
                    formData.append('fileSize', file.size);
                    formData.append('totalChunks', totalChunks.toString());
                    res = await Requests.postFormData(url, formData);
                    if (res.success) {
                        toast.success("ثبت با موفقیت انجام شد");
                        const p = this.state.redirectParams ? objectToQueryString(this.state.redirectParams) : '';
                        this.props.router.push(`/admin448/${this.state.path}${p}`);
                    } else {
                        toast.error(res.message);
                    }
                    this.setState({loader: false});

                } else {
                    console.log('File upload failed. Not all chunks were uploaded.');
                }

            } else {
                AlertModal("error", "لطفا ویدیو را انتخاب کنید.", "");
            }
        }
        console.log("here");
    }

    render() {
        return (
            <ContainerContent title={'ویدیو'}>
                <ParentForm validated={this.state.validated} loader={this.state.loader}
                            handleSubmit={this.handleSubmit}>
                    <div className='col-12 col-md-7 my-3'>
                        <CustomControl
                            pattern="image"
                            className={`custom-input col-12`}
                            id='file'
                            type='image'
                            value={this.state.file || this.props.editItem?.image}
                            title='تصویر کاور (1080  * 1980)'
                            onChange={(id, file) => this.setState({file: file})}
                            isRequired={true}
                        />
                    </div>


                    <CustomControl
                        type='select'
                        id='videoType'
                        title='نوع ویدیو'
                        options={{'': '', 1: "لینک ویدیو", 2: "پرلایک"}}
                        value={this.state.data.videoType}
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

                    {
                        parseInt(this.state.data.videoType) === 1 ? <CustomControl
                            type='text'
                            id='videoPath'
                            title='لینک ویدیو'
                            value={this.state.data.videoPath}
                            className={`custom-input col-12`}
                            onChange={this.changeFormData}
                            isRequired={true}
                        /> : <div className='col-12'>
                            <span className='font-13 d-block mb-1'>باگزاری ویدیو:</span>
                            <VideoUpload
                                file={this.state.video}
                                process={this.state.process}
                                setFile={(file) => this.setState({video: file})}
                            />
                        </div>
                    }


                </ParentForm>
            </ContainerContent>
        )
    }
}

VideoForm.propTypes = {
    editItem: PropTypes.any,
    onDone: PropTypes.func,
}

export default withRouter(VideoForm);
