import Layout from "@/components/Pages/Layout";
import Headers from "@/components/Tools/Headers";
import SoonPage from "@/components/Pages/Soon/SoonPage";
import {ServerSide} from "@/lib/ServerSide";

const HomePage = ({results}) => {
    console.log(results);
    const seoData = {
        "title": "",
        "description": "",
        "link": "",
        "jsonld": null
    }

    return (
        <Layout>
            <Headers seo={seoData}/>
            <SoonPage/>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('home', ctx, 24);
}


export default HomePage;