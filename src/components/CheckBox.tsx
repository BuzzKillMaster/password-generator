import {FaCheck} from "react-icons/fa";
import React from "react";

export default function CheckBox(props: {
    label: string
    checked: boolean
    handleClick: () => void
}) {
    return (
        <div onClick={props.handleClick} className={"flex items-center cursor-pointer"}>
            <div
                className={"p-1 border-2 mr-4 hover:border-green-400" + (props.checked ? " border-green-400 bg-green-400" : "")}>
                <FaCheck className={"text-xs text-stone-800"}/>
            </div>
            <p className={"font-semibold"}>{props.label}</p>
        </div>
    )
}