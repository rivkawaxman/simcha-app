import * as React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'




interface InputProps {
    wrapperClass?:string;
    className?: string;
    type: string;
    name: string;
    value?: string | number | boolean;
    placeholder?: string;
    onChange?: (event: any) => void;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    checked?:boolean;
    readOnly?:boolean;
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
        <div className={props.wrapperClass}>
            {renderError(props)}
            <input
                type={props.type}
                checked={props.checked}
                className={props.className}
                name={props.name}
                required={props.required}
                readOnly={props.readOnly}
                value={props.value ? props.value.toString(): ''}
                placeholder={props.placeholder}
                onChange={(e) => {props.onChange ? props.onChange(e) : console.log(e)}}
            />
        </div>
    )
}