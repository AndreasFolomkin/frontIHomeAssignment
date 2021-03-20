import React, {useState} from "react";
import './App.css';
import axios from 'axios';
import TableCustom from "./Components/Table/Table";
import Upload from "./Components/Upload/Upload";


function App() {
    const [state, setState] = useState([]);
    const [flag, setFlag] = useState(false);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);

        axios.put("http://localhost:8080/putFile", formData)
            .then(res => setState(res.data.body))
            .then(() => setFlag(true))
    };

    return (
        <div className={'App'}>
            <Upload onSubmit={onSubmit}/>
            {flag ? <TableCustom state={state}/> : <></>}
        </div>

    );
}

export default App;
