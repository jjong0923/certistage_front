import headerLogo from "../images/certistageLogo.png";

function Header() {
  return (
    <header className="flex h-[105px] items-center justify-center bg-[#023685]">
      <img
        src={headerLogo}
        alt="logo"
        className="h-[110px]"
      />
    </header>
  );
}

export default Header;
