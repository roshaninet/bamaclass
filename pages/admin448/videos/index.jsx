import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import VideoLists from "@/components/Admin/Video/VideoLists";

const AdminVideoPage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت ویدیو ها'}}/>
            <VideoLists results={results} parameters={parameters} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/videos', ctx, 24);
}

export default AdminVideoPage;