export const Spinner = (props) => {
    const {addStyle} = props;
    const style = {
        width: "60px",
        height: "60px",
    }
    return(
        <div style={{textAlign:"center", marginTop: "100px"}}>
            <div style={style} class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        
    );
}

