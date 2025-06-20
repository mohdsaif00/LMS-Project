import {Link}  from "react-router-dom";
function Header() {
    return (
        <nav className="min-h-xl flex items-center justify-around bg-white shadow-md py-2  ">
            <div className="flex justify-around gap-60">
                <div className="flex gap-20">
                    <Link href="#">
                        <img src="https://cdn-editing-temp.picsart.com/editing-temp-landings/c4e056b6-23b3-41d0-8200-93f445bac86c.png" alt="logo" className="w-40" />
                    </Link>
                </div>
                <div className="flex items-center justify-center space-x-20">
                    <Link to="#" className="font-medium hover:text-purple-600">Home </Link>
                    <Link to="#" className="font-medium hover:text-purple-600"> Courses </Link>
                    <Link to="#" className="font-medium hover:text-purple-600"> Contact</Link>
                </div>
                <div className="flex items-center justify-center space-x-6">
                    <Link to="/login" className="border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-500 hover:text-white">
                        Sign In
                    </Link>
                    <Link to="/register" className="border border-purple-600 text-white px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
export default Header;