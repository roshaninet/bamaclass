import React from "react";
import AdminLayout from "@/components/Admin/AdminLayout";
import {ServerSide} from "@/lib/ServerSide";
import OptionPanel from "@/components/Admin/Option/Option";
import Headers from "@/components/Tools/Headers";

const OptionPAge = ({results, parameters}) => {
    return (
        <AdminLayout>
            <Headers seo={{title: 'تنظیمات'}}/>
            <OptionPanel options={results} parameters={parameters}/>
        </AdminLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    return await ServerSide('admin/options', ctx, 0);
}

export default OptionPAge;