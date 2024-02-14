import withAuth from "@/app/hoc/withAuth.client";
import Navbar from "@/app/components/templates/navbar";

const  QuestionManage = () => {
    return(
        <div>
            <Navbar>
            <h1>QuestionManage</h1>
            </Navbar>
        </div>
    )
};
export default withAuth(QuestionManage);