import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import SlideLists from "@/components/Admin/Slide/SlideLists";

const AdminSlidesPage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت اسلاید ها'}}/>
            <SlideLists parameters={parameters} results={results} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/slides', ctx, 24);
}

export default AdminSlidesPage;