import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import {ServerSide} from "@/lib/ServerSide";
import VideoForm from "@/components/Admin/Video/VideoForm";

const VideoNewPage = ({results}) => {
    return <AdminLayout>
        <Headers seo={{title: 'کاربر'}}/>
        <VideoForm editItem={results}/>
    </AdminLayout>

}


export const getServerSideProps = async (ctx) => {
    return await ServerSide(`admin/videos/${ctx.query.id}`, ctx, 0);
}


export default VideoNewPage;
