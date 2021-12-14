export const PrimaryButton = ({children, onClick}) => {
    return(
        <button className="btn btn-lg btn-primary btn-block" onClick={onClick}>{children}</button>
    )
}