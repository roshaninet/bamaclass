import Headers from "@/components/Tools/Headers";
import AdminLayout from "@/components/Admin/AdminLayout";
import VideoForm from "@/components/Admin/Video/VideoForm";

const VideoNewPage = () => {

    return <AdminLayout>
        <Headers seo={{title: 'بلاگ'}}/>
        <VideoForm editItem={null}/>
    </AdminLayout>

}



export default VideoNewPage;
