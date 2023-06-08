import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import EpisodeLists from "@/components/Admin/Episode/EpisodeLists";

const AdminEpisodePage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت اسلاید ها'}}/>
            <EpisodeLists results={results} parameters={parameters} />
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/episodes', ctx, 24);
}

export default AdminEpisodePage;