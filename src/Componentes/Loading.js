import React from "react";
import './Loading.css';

export default function Loading({ load }){

    return (
        <div className={load ? 'loading' : 'd-none'}>
            <div className="c-loader"></div>
        </div>
    )
}