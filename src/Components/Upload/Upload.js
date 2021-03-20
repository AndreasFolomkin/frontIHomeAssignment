import React from 'react';
import {useForm} from "react-hook-form";
import "./Upload.css"

function Upload({onSubmit}) {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className={"custom-file-input"} type="file" ref={register({required: true})} name="file"/>
            <button style={{cursor: "pointer"}} >Submit</button>
        </form>
    )
}

export default Upload;
