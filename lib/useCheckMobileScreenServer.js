import {headers} from "next/headers";

const useCheckMobileScreenServer = () => {

    const header = headers();
    const agent = header.get("user-agent");

    return Boolean(agent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ));
}

export default useCheckMobileScreenServer