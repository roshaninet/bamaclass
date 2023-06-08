import {ServerSide} from "@/lib/ServerSide";
import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import FaqLists from "@/components/Admin/Faq/FaqLists";

const AdminFaqPage = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'مدیریت پرسش و پاسخ ها'}}/>
            <FaqLists parameters={parameters} results={results}/>
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/faqs', ctx, 24);
}

export default AdminFaqPage;