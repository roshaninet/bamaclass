import UserForm from "@/components/Admin/User/UserForm";
import Headers from "@/components/Tools/Headers";
import AdminLayout from "@/components/Admin/AdminLayout";

const UserNewPage = ({results}) => {

    return <AdminLayout>
        <Headers seo={{title: 'بلاگ'}}/>
        <UserForm editItem={null}/>
    </AdminLayout>

}



export default UserNewPage;
