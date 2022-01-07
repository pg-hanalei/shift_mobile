export const Spinner = () => {
    const style = {
        width: "60px",
        height: "60px",
    }
    return(
        <div style={{textAlign:"center", marginTop: "100px"}}>
            <div style={style} className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

