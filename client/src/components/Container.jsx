function Container({ children }) {

    return(
        <>
            <h1 className="title">Spotify to Mp3</h1>
            
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default Container;