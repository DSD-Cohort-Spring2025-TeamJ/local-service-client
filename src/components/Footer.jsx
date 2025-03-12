import Logo from '/src/components/Logo.jsx'
export default function Footer() {
    return (
        <footer>
            <div className="address">
                <p>200 Agile Avenue</p>
                <p>Plungerville, TX</p>
            </div>
            <div className="copyright-center">
                <p className="copyright">Copyright 2025 The Pragmatic Plumber</p>
            </div>
            <div className="email-address">
                <p><a href="mail to:">ThePragPlumb@Plumbing.com</a></p>
            </div>
            <Logo />
        </footer>
    )
}