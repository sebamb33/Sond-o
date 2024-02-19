import withAuth from "@/app/hoc/withAuth.client";
import {useRouter} from 'next/router'

const FormularyManage = () => {
    const router = useRouter();
    const {formularyid} = router.query;
    console.log(router.query);
    let userAuthorized = false;

    return (
        <div>
            <h1>FormularyManage</h1>
            <p>{formularyid}</p>
        </div>
    );
};


export default withAuth(FormularyManage);