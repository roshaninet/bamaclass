import {useRouter} from "next/router";
import icons from "@/scss/modules/icons.module.scss"

const BackButton = ({visibleMobile, visibleWeb}) => {
    const router = useRouter();
    return (
        <button
            className={`py-2 bg-transparent font-18 ${visibleMobile ? 'd-flex' : 'd-none'} ${visibleWeb ? 'd-md-flex' : 'd-md-none'}`}
            onClick={() => router.back()}>
            <i className={icons.shGo}/>
        </button>
    )
}

BackButton.defaultProps = {
    visibleMobile: true,
    visibleWeb: true
}


export default BackButton;