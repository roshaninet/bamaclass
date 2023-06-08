import AdminLayout from "@/components/Admin/AdminLayout";
import Headers from "@/components/Tools/Headers";
import {ServerSide} from "@/lib/ServerSide";
import EpisodeForm from "@/components/Admin/Episode/EpisodeForm";

const EpisodeNewPage = ({results}) => {
    return <AdminLayout>
        <Headers seo={{title: 'کاربر'}}/>
        <EpisodeForm editItem={results}/>
    </AdminLayout>

}


export const getServerSideProps = async (ctx) => {
    return await ServerSide(`admin/episodes/${ctx.query.id}`, ctx, 0);
}


export default EpisodeNewPage;
