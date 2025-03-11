import Logo from "/src/components/Logo.jsx"
import SubmissionStatus from "/src/components/SubmissionStatus.jsx"

export default function Services() {
    return (
        <>
        <Logo />
        
        <div className="services-nav">
        <button className="services remodel">Remodel</button>
        <button className="services installation">Installation</button>
        <button className="services repairs">Repairs</button>
        <button className="services gas">Gas Related</button>
        <button className="services unsure">Unsure</button>
        </div>
        </>
    )
}