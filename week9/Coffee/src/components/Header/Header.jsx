import './header.css';

export default function Header() {
    return (
        <header id="header">
            <img className="logo" src="./logo.svg" alt=""/>
            <nav>
                <a href="#">Beans</a>
                <a href="#">Coffee</a>
            </nav>
        </header>
    );
}