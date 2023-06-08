import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import CurseLists from "@/components/Admin/Curse/CurseLists";

const AdminCursesPage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت دوره ها'}}/>
            <CurseLists parameters={parameters} results={results} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/curses', ctx, 24);
}

export default AdminCursesPage;