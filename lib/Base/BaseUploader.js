import {Component} from "react";
import {AlertModal} from "@/components/Tools/AlertModal";

class BaseUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploading: false
        }

        this.onAccept = this.onAccept.bind(this);
        this.readURL = this.readURL.bind(this);
        this.onReject = this.onReject.bind(this);
    }

    onAccept(accepts) {
        this.setState({
            file: accepts[0]
        }, () => {
            this.readURL();
        })
    }

    onReject(files) {
        let message = '';

        files.map((file, i) => {
            switch (file.errors[0].code) {
                case 'file-invalid-type':
                    message += `فرمت فایل با نام ${file.file.name} صحیح نمی باشد . \r\n`
                    break;
                case 'file-too-large':
                    message += `حجم فایل با نام ${file.file.name} نمیتواند بیشتر از ${this.props.maxMB} مگابایت باشد. \r\n`
                    break;
            }
        });

        AlertModal('error', 'خطا', message);

    }

    readURL() {
        if (this.state.file) {
            let input = this.state.file;
            let reader = new FileReader();
            reader.onload = (e) => {
                input.url = e.target.result;
                this.setState({
                    file: input
                }, () => {
                    this.props.setFile(this.state.file);
                })
            }

            reader.readAsDataURL(input);

        }
    }
}

export default BaseUploader;
