import pragmaticplumberlogo from '/src/assets/pragmaticplumberlogo.png';

export default function Services() {
    return (
        <>
        <div className="logo">
        <img className="pragmatic-plumber" src={pragmaticplumberlogo} alt="The Pragmatic Plumber Logo" />
        </div>
        
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