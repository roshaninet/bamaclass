import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import UserForm from "@/components/Admin/User/UserForm";
import {ServerSide} from "@/lib/ServerSide";

const BlogsNewPage = ({results}) => {
    return <AdminLayout>
        <Headers seo={{title: 'کاربر'}}/>
        <UserForm editItem={results}/>
    </AdminLayout>

}


export const getServerSideProps = async (ctx) => {
    return await ServerSide(`admin/users/${ctx.query.id}`, ctx, 0);
}


export default BlogsNewPage;
