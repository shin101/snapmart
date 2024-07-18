import Image from "next/image";
import Link from "next/link";
import logo from "../public/text-logo.png";

interface HeaderProps {
  link?: string;
  text?: string;
}

export const Header = ({ link, text, ...rest }: HeaderProps) => {
  return (
    <div
      className="p-4 sticky top-0 flex justify-between items-center border-b bg-white"
      {...rest}
    >
      <Image src={logo} alt="logo" className="h-20 w-36" />
      {link ? (
        <Link href={link} className="primary-btn w-28">
          {text}
        </Link>
      ) : null}
    </div>
  );
};
