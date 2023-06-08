import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import UserLists from "@/components/Admin/User/UserLists";

const AdminTeachersPage = ({results, parameters}) => {

    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت کاربران ها'}}/>
            <UserLists results={results} parameters={parameters}/>
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/users', ctx, 24);
}

export default AdminTeachersPage;