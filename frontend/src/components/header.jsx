
function Header() {
    return (
        <nav className="min-h-xl flex items-center justify-around bg-white shadow-md py-2  ">
            <div className="flex justify-around gap-60">
            <div className="flex gap-20">
                <a href="#">
                    <img src="https://cdn-editing-temp.picsart.com/editing-temp-landings/c4e056b6-23b3-41d0-8200-93f445bac86c.png" alt="logo" className="w-40" />
                </a>
                 
            </div>
           
            <div className="flex items-center justify-center space-x-20">
                <a href="#" className="font-medium hover:text-purple-600">Home </a>
                <a href="#" className="font-medium hover:text-purple-600"> Courses </a>
                <a href="#" className="font-medium hover:text-purple-600"> Contact</a>
            </div>
            <div className="flex items-center justify-center space-x-6">
                <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-500 hover:text-white">
                    Sign In
                </button>
                <button className="border border-purple-600 text-white px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">
                    Sign up
                </button>
            </div>
            </div>
        </nav>
    );
}
export default Header;