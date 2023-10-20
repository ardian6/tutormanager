import { useParams } from "react-router-dom"

const TempView = () => {
    const param = useParams();
    const username = param.username;
    return <div>
        {username}
    </div>
}

export default TempView