import BaseClass from "@/lib/Base/BaseClass";
import PropTypes from "prop-types";
import {withRouter} from "next/router";
import dynamic from "next/dynamic";
import ContainerContent from "../Layout/ContainerContent";
import CustomControl from "@/components/Tools/CustomControl";
import BackButton from "@/components/Tools/BackButton";
import FilterContainer from "@/components/Tools/FilterContainer";
import ModalDialog from "@/components/Tools/ModalDialog";


const VideoCard = dynamic(() => import('./VideoCard'), {
    ssr: false
});

const VideoView = dynamic(() => import('./VideoView'), {
    ssr: false
});


class VideoLists extends BaseClass {
    constructor(props) {
        super(props);
        this.state.title = 'ویدیو ها';
        this.state.path = 'videos';
        this.state.videoPath = '';
        this.state.standAlone = true;
        this.state.redirectParams = props.parameters?.episodeId ? {
            episodeId: props.parameters?.episodeId
        } : null
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.parameters !== this.props.parameters) {
            this.setState({
                params: this.props.parameters
            })
        }
    }

    render() {
        return (
            <ContainerContent
                title={`${this.state.title} ${this.state.params?.parent ? this.props.results.parents[this.state.params?.parent] : ''} `}
                abs={this.addButton()}
                left={this.state.params?.parentId ? <BackButton/> : null}
                total={this.props.results.total}
                right={this.filterButton()}>
                <div className='col-12'>
                    <FilterContainer show={this.state.filter} close={() => this.setState({filter: false})}>
                        <div className='row'>
                            <CustomControl
                                className={`col-12 col-md-3 text-center custom-input`}
                                id='search'
                                placeholder='جستجو'
                                type='text'
                                value={this.state.params.search || ''}
                                onChange={this.onChange}
                            />

                            <CustomControl
                                type='select'
                                id='active'
                                options={{'': 'همه وضعیت ها', false: 'غیر فعال', true: 'فعال'}}
                                value={this.state.params.active}
                                Ï className={`custom-input col-md-3 col-6`}
                                onChange={this.onChange}
                            />

                            <CustomControl
                                type='select'
                                id='videoType'
                                options={{
                                    '': 'همه نمابش ها',
                                    1: "لینک ویدیو",
                                    2: "پرلایک"
                                }}
                                value={this.state.params.videoType}
                                className={`custom-input col-md-3 col-6`}
                                onChange={this.onChange}
                            />

                            <CustomControl
                                type='select'
                                id='orderby'
                                options={{
                                    '': 'جدیدترین',
                                    'priority:asc': 'ترتیب صعودی',
                                    'priority:desc': 'ترتیب نزولی'
                                }}
                                value={this.state.params.orderby}
                                className={`custom-input col-md-3 col-6`}
                                onChange={this.onChange}
                            />
                        </div>
                    </FilterContainer>

                </div>

                {
                    this.props.results.total === 0 ? <div className='w-100 p-5 text-center'>
                            <span className='d-block pb-3'>داده ای برای نمایش وجود ندارد.</span>
                        </div> :
                        <div className='row'>
                            {
                                this.props.results && this.props.results.items.map((item, i) => {
                                    return (
                                        <div key={`g-${i}`} className='col-12 col-md-6 mb-3'>
                                            <VideoCard
                                                loader={this.state.removeLoader === item.id}
                                                remove={() => this.remove(item)}
                                                item={item}
                                                view={() => this.setState({videoPath: item.videoPath})}
                                                edit={() => this.edit(item)}/>
                                        </div>
                                    )
                                })
                            }
                        </div>

                }
                <ModalDialog size='lg' title="مشاهده ویدیو" zeroPadding={true} className="modal-pretty-head" show={!!this.state.videoPath}
                             setShow={() => this.setState({videoPath: ''})} animation={true} withDarkMode={true}>
                    <VideoView videoPath={this.state.videoPath}/>
                </ModalDialog>
            </ContainerContent>
        )
    }
}

VideoLists.propTypes = {
    results: PropTypes.object,
    parameters: PropTypes.object
}


export default withRouter(VideoLists);