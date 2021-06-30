import { FC } from "react"

const Layout: FC = ({ children }) => {
    return (
        <>
            
            <main style={{
            margin: "0 auto", width: "90%", maxWidth: "768px",
                height: "100vh",
                display: "flex",
                alignItems: "center"
            }}>
                <div style={{ width: "100%"}}>
                    
                {children}
                </div>
            </main>
        </>
    )
}

export default Layout;