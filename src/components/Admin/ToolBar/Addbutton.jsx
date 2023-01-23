import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import {GrAddCircle} from "react-icons/gr";


function AddButton({name, url}) {
    let navigate = useNavigate()
    return (
        <Button
            color="success"
            outline
            onClick={() => navigate(url)}>
            <GrAddCircle className="addButton"/>
            Add New {name}
        </Button>
    )
}

export default AddButton;