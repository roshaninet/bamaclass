import {connect} from "react-redux";
import Headers from "@/components/Tools/Headers";
import AdminLayout from "@/components/Admin/AdminLayout";
import Dashboard from "@/components/Admin/Home/Dashboard";
import Authentication from "@/components/Admin/Home/Auth";

const AdminDashboard = ({isLogin, user}) => {
    if (isLogin && user && [1].indexOf(parseInt(user.type)) > -1) {
        return <AdminLayout>
            <Headers seo={{title: 'پنل مدیریت'}}/>
            <Dashboard/>
        </AdminLayout>
    } else {
        return <AdminLayout>
            <Headers seo={{title: 'پنل مدیریت'}}/>
            <Authentication/>
        </AdminLayout>
    }

}

function mapStateToProps(state) {
    return {
        isLogin: state.isLogin,
        user: state.user
    };
}

export default connect(mapStateToProps, {})(AdminDashboard);
