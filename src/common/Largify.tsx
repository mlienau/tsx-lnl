import * as React from "React";

export interface LargifyProps {
    message: string;
}

export function Largify (props: LargifyProps) {
    return (
        <h1>{props.message}</h1>
    );
}
