import pipe from '/src/assets/pipe.png';
import Logo from '/src/components/Logo.jsx'
export default function SubmissionStatus() {
    return (
        <div className="submission-status">
        <h2 className="submissionStatus-title">Submission Status</h2>
        <img src={pipe} style={{width: '400px', height: '15px'}} />
        <div className="submission-message-box" stye={{ width: '350px', height: '300', backgroundColor: 'red'}}>
            {/* <p>${submissionStatus}</p> */}
            {/* where does the message come from? decided elsewhere */}
        </div>
        <div className="submission-logo">
        <Logo />
        </div>
        </div>
    )
}