import Image from "next/image";
import GoogleSvg from "/public/logos/google.svg";

const GoogleLogo = () => {
  return (
    <>
      <Image src={GoogleSvg} className="w-4 h-4" alt="google" />
    </>
  );
};

export default GoogleLogo;
