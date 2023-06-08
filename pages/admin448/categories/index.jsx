import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import CategoryLists from "@/components/Admin/Category/CategoryLists";

const AdminCategoriesPage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت دسته بندی ها'}}/>
            <CategoryLists results={results} parameters={parameters}/>
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/categories', ctx, 24);
}

export default AdminCategoriesPage;