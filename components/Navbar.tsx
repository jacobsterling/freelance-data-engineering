import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-slate-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DataEngineerPro
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="#services" className="hover:text-slate-300">
              Services
            </Link>
          </li>
          <li>
            <Link href="#team" className="hover:text-slate-300">
              Our Team
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-slate-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

