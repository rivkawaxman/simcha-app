import * as React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'




interface InputProps {
    className?: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (event: any) => void;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
}

function renderError(props: InputProps) {

    if (props.error) {
        let tooltip = (
            <Tooltip id="tooltip"> {props.errorMessage}</Tooltip>
        );
        return (
            <OverlayTrigger placement="right" overlay={tooltip}>
                <i className="fa fa-exclamation-circle error-thingy"></i>
            </OverlayTrigger>
        )
    }
    else {
        return <i></i>
    }
}


export default function Input(props: InputProps) {
    return (
        <div>
            {renderError(props)}
            <input
                className={props.className}
                type={props.type}
                name={props.name}
                required={props.required}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(e) => { props.onChange(e) }}
            />
        </div>
    )
}