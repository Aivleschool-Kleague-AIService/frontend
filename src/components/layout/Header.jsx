// src/components/layout/Header.jsx

import { useNavigate } from "react-router-dom";
import "./Header.css";

const TEAM_LOGOS = [
  "/logos/jeonbuk.png",
  "/logos/ulsan.png",
  "/logos/seoul.png",
  "/logos/gangwon.png",
  "/logos/daegu.png",
  "/logos/incheon.png",
  "/logos/suwon.png",
  "/logos/pohang.png",
  "/logos/gwangju.png",
  "/logos/jeju.png",
  "/logos/daejeon.png",
  "/logos/gimcheon.png",
];

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="header-left"
          type="button"
          onClick={() => navigate("/rounds")}
          aria-label="K리그 경기 일정으로 이동"
        >
          <span className="league-text">K LEAGUE 1</span>
        </button>

        <div className="header-teams">
          {TEAM_LOGOS.map((src) => (
            <span className="team-logo-frame" key={src}>
              <img src={src} alt="" className="team-logo" />
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
