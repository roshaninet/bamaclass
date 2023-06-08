import Layout from "@/components/Pages/Layout";
import Headers from "@/components/Tools/Headers";
import SoonPage from "@/components/Pages/Soon/SoonPage";

const HomePage = () => {
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

export default HomePage;