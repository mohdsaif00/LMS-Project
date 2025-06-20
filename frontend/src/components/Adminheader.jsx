import { Link } from "react-router-dom";
export default function Adminheader() {
  return (
    <nav className="w-full bg-white p-4 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="#">
          <img
            src="https://cdn-editing-temp.picsart.com/editing-temp-landings/c4e056b6-23b3-41d0-8200-93f445bac86c.png" alt="logo" className="w-24 sm:w-32" />
        </Link>
        <h1 className="text-gray-700 text-lg font-medium">Hi! Great</h1>
      </div>
    </nav>


  );
}