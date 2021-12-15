import {memo} from 'react';

export const PrimaryButton = memo(({children, onClick, className=""}) => {
    return(
        <button className={`btn btn-lg btn-primary btn-block ${className}`} onClick={onClick}>{children}</button>
    )
});