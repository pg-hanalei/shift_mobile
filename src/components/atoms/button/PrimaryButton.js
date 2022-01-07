import {memo} from 'react';

export const PrimaryButton = memo(({children, onClick, disabled = false, className=""}) => {
    return(
        <button className={`btn btn-lg btn-primary btn-block ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
    )
});