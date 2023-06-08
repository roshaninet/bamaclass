import Headers from "@/components/Tools/Headers";
import AdminLayout from "@/components/Admin/AdminLayout";
import EpisodeForm from "@/components/Admin/Episode/EpisodeForm";

const EpisodeNewPage = () => {

    return <AdminLayout>
        <Headers seo={{title: 'بلاگ'}}/>
        <EpisodeForm editItem={null}/>
    </AdminLayout>

}



export default EpisodeNewPage;
