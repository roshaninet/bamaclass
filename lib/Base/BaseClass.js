import {Component} from "react";
import {cloneObject, objectToQueryString, reload} from "@/lib/Functions";
import icons from '@/scss/modules/icons.module.scss';
import styles from '@/scss/modules/panel.module.scss';
import Requests from "../Requests";
import {ConfirmDialog} from "@/components/Tools/ConfirmDialog";
import Pagination from "@/components/Tools/Pagination";
import {AlertModal} from "@/components/Tools/AlertModal";

class BaseClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            redirectParams: null,
            editItem: false,
            timeout: null,
            standAlone: false,
            filter: false,
            params: this.props.parameters,
            paramsLength: this.props.parameters ? Object.keys(this.props.parameters).length : '',
            title: '',
            path: '',
            removeLoader: -1
        }

        this.edit = this.edit.bind(this);
        this.create = this.create.bind(this);
        this.addButton = this.addButton.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.pagination = this.pagination.bind(this);
        this.filterButton = this.filterButton.bind(this);
        this.filter = this.filter.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.parameters != this.props.parameters) {
            this.setState({
                paramsLength: this.props.parameters ? Object.keys(this.props.parameters).length : '',
            })
        }
    }

    async closeModal(rs = false) {
        this.setState({
            show: false,
            editItem: false
        });

        if (rs) {
            await reload(this.props.router);
        }

    }

    edit(item) {
        if (this.state.standAlone) {
            const p = this.state.redirectParams ? objectToQueryString(this.state.redirectParams) : '';
            this.props.router.push(`/admin448/${this.state.path}/form/${item.id}${p}`);
        } else {
            this.setState({
                editItem: item,
                show: true
            })
        }

    }

    async remove(item) {
        if (await ConfirmDialog('از حذف اطمینان دارید ؟')) {
            this.setState({removeLoader: item.id});
            const res = await Requests.deleteData(`admin/${this.state.path}/${item.id}`, {});
            this.setState({removeLoader: -1});
            if (res.success) {
                await reload(this.props.router, 200);
            } else {
                await AlertModal('error', res.message);
            }

        }
    }

    create() {
        if (this.state.standAlone) {
            const p = this.state.redirectParams ? objectToQueryString(this.state.redirectParams) : '';
            this.props.router.push(`/admin448/${this.state.path}/form${p}`);
        } else {
            this.setState({show: true})
        }
    }

    filter() {
        this.setState({filter: !this.state.filter})
    }


    onChange(id, value) {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
            this.setState({
                timeout: null
            })
        }
        const data = cloneObject(this.props.parameters);
        data[id] = value;

        this.setState({
            params: data
        }, () => {
            Object.keys(data).forEach((k) => !data[k] && delete data[k]);

            const t = setTimeout(() => {
                this.props.router.push({
                    pathname: `/admin448/${this.state.path}`,
                    query: data,
                });
            }, 500);
            this.setState({
                timeout: t
            })
        })


    }

    filterButton() {
        return <>
            <button type="button"
                    className={`btn d-none d-md-flex align-items-center btn-sm rounded-pill px-3 ${this.state.filter ? 'btn-primary' : 'btn-outline-danger'}`}
                    onClick={this.filter}>
                <i className={`${icons.shFilter} font-15`}/>
                <span className='pe-1'>فیلتر {this.state.paramsLength ? ` (${this.state.paramsLength}) ` : ''}</span>
            </button>
            <button type="button"
                    className={`btn border-0  d-md-none btn-sm rounded-pill font-24 d-flex ${this.state.filter ? 'text-secondary' : ''}`}
                    onClick={this.filter}>
                <i className={icons.shFilter}/>
            </button>
        </>;
    }

    addButton() {
        return <button type="button" className={`${styles.addButton}  shadow`} onClick={this.create}>
            <i className={`${icons.shAdd}`}/>
        </button>;
    }

    pagination() {
        return (
            this.props.results.page > 0 ? <div className='col-12'>
                <Pagination type={`/${this.state.path}`} max={5} total={this.props.results.total}
                            perPage={this.props.results.perPage}
                            page={this.props.results.page}
                            pages={this.props.results.pages}
                            parameters={this.props.parameters}/>
            </div> : null
        )
    }


}

export default BaseClass;