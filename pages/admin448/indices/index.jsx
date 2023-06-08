import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import CurseLists from "@/components/Admin/Curse/CurseLists";
import IndexLists from "@/components/Admin/Index/IndexLists";

const AdminIndicesPage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت سرفصل ها'}}/>
            <IndexLists parameters={parameters} results={results}/>
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/indices', ctx, 24);
}

export default AdminIndicesPage;