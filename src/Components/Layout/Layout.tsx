import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
export function Layout() {
  return (
    <>
      <div className="content">
        <header>
          <nav>
            <ul className="navList">
              <li className="navItem">
                <Link to="/">Hem</Link>
              </li>
              <li>
                <Link to="/about">Om</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Outlet></Outlet>
        </main>
        <footer>
          <p>Copyright 2022</p>
        </footer>
      </div>
    </>
  );
}
