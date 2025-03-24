import { Link } from "react-router-dom";
import pragmaticplumber from "/pragmaticplumberlogo.png";

export default function Logo() {
  return (
    <Link to="/">
      <img
        src={pragmaticplumber}
        className="w-[275px] sm:w-[350px]"
        alt="pragmatic plumber logo"
      />
    </Link>
  );
}
