import React from "react";

export default function PasswordStrengthIndicator(props: {
    active: boolean
}) {
    return (
        <div className={(props.active ? "bg-yellow-600 " : "border-2 opacity-75 ") + "w-2 h-full"}></div>
    )
}