import {Component} from "react";
import {cloneObject, objectToQueryString} from "../Functions";
import Requests from "../Requests";
import {toast} from "react-toastify";

class BaseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            redirectParams: null,
            loader: false,
            data: {},
            process: 0,
            empty: {},
            path: '',
            files: [],
            formData: false,
            standAlone: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFormData = this.changeFormData.bind(this);
    }

    componentDidMount() {
        if (this.props.editItem) {
            this.setState({
                data: this.props.editItem
            });
        } else {
            this.setState({
                data: this.state.empty
            })
        }
    }


    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({validated: true});

        if (event.target.checkValidity()) {
            this.setState({loader: true});
            let res;

            let url = `admin/${this.state.path}`;
            if (this.props.editItem) {
                url = `admin/${this.state.path}/${this.props.editItem.id}`;
            }

            if (this.state.formData) {
                let formData = new FormData(event.target);
                for (const f of this.state.files) {
                    formData.append(f, this.state[f]);
                }

                for (const f of Object.keys(this.state.data)) {
                    formData.append(f, this.state.data[f] === null ? '' : this.state.data[f]);
                }

                if (this.props.editItem) {
                    formData.append('_method', 'PUT');
                }
                res = await Requests.postFormData(url, formData);
            } else {
                if (this.props.editItem) {
                    let d = {};
                    for (const f of Object.keys(this.state.data)) {
                        d[f] = this.state.data[f] || '';
                    }

                    res = await Requests.putData(url, d);
                } else {
                    res = await Requests.postData(url, this.state.data);
                }
            }

            if (res.success) {
                toast.success("ثبت با موفقیت انجام شد");
                // await AlertModal('success', 'موفقیت', 'ثبت با موفقیت انجام شد..');
                if (this.state.standAlone) {
                    const p = this.state.redirectParams ? objectToQueryString(this.state.redirectParams) : '';
                    this.props.router.push(`/admin448/${this.state.path}${p}`);
                } else {
                    this.props.onDone(res.response);
                }
            } else {
                toast.error(res.message);
                // await AlertModal('error', 'خطا', res.response);
            }
            this.setState({loader: false});
        } else {
            const list = event.target.querySelectorAll(':invalid');
            list[0].focus();
        }
    };

    changeFormData(id, val) {
        let d = cloneObject(this.state.data);
        d[id] = val;
        this.setState({data: d});
    }

}

export default BaseForm;