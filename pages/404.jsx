import React from "react";
import ImageElement from "@/components/Tools/ImageElement";
import Layout from "@/components/Pages/Layout";
import Err404 from "@/public/img/404.png";

const NotFoundPage = () => {
    return (
        <Layout>
            <div className='d-flex w-100 align-items-center justify-content-center py-5'>
                <ImageElement width={500} height={250}
                              lazy={false}
                              quality={60}
                              url={false}
                              className="rounded-circle border border-4 border-danger img-responsive px-md-0"
                              image={Err404}
                              title="Page Not Found 404"/>
            </div>
        </Layout>
    )
}

export  default  NotFoundPage;