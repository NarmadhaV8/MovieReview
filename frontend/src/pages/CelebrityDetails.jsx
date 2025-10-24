import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const celebData = {
  1: {
    name: "Nayanthara",
    role: "Actress",
    dob: "18 Nov 1984",
    bio: "Famous Tamil actress known as Lady Superstar.",
    img: "/public/nayanthara.jpeg",
    topMovies: [
      "Aramm", "Maya", "Kolamavu Kokila", "Asuran", "Viswasam",
      "Imaikkaa Nodigal", "Naanum Rowdy Dhaan", "Raja Rani", "Vikram Vedha", "Ayya"
    ]
  },
  2: {
    name: "Ajith Kumar",
    role: "Actor",
    dob: "1 May 1971",
    bio: "Popular Tamil actor known as Thala.",
    img: "/public/ajith.jpeg",
    topMovies: [
      "Mankatha", "Vedalam", "Veeram", "Valimai", "Billa",
      "Viswasam", "Asal", "Yennai Arindhaal", "Arrambam", "Thala 57"
    ]
  },
  3: {
    name: "Suriya",
    role: "Actor",
    dob: "23 Jul 1975",
    bio: "Renowned Tamil actor and philanthropist.",
    img: "/public/suriya.jpeg",
    topMovies: [
      "Soorarai Pottru", "Singam", "Ghajini", "Kaakha Kaakha", "Vaaranam Aayiram",
      "24", "Jai Bhim", "Pithamagan", "Ayan", "NGK"
    ]
  },
  4: {
    name: "Samantha",
    role: "Actress",
    dob: "28 Apr 1987",
    bio: "Popular Tamil and Telugu actress.",
    img: "/public/samantha.jpeg",
    topMovies: [
      "Eega", "Theri", "Mersal", "Rangasthalam", "Oh! Baby",
      "Majili", "Super Deluxe", "U Turn", "Ye Maaya Chesave", "Bommarillu"
    ]
  },
  5: {
    name: "Trisha",
    role: "Actress",
    dob: "4 May 1983",
    bio: "Veteran Tamil actress with a successful career.",
    img: "/public/trisha.jpeg",
    topMovies: [
      "96", "Vinnaithaandi Varuvaayaa", "Ghilli", "Varsham", "Thirupaachi",
      "Khatta Meetha", "Kodi", "Ponniyin Selvan", "Nuvvostanante Nenoddantana", "Chekka Chivantha Vaanam"
    ]
  }
};

function CelebrityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const celeb = celebData[Number(id)];

  if (!celeb)
    return <p className="text-center text-red-600 mt-6">Celebrity not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <button
        className="mb-6 px-5 py-2 bg-[#7ecbfa] text-gray-900 font-medium rounded-full shadow-md hover:bg-blue-400 hover:text-white transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <img
          src={celeb.img}
          alt={celeb.name}
          className="w-48 h-48 object-cover rounded-2xl shadow-md border-4 border-[#7ecbfa]"
        />
        <div className="text-gray-800">
          <h1 className="text-4xl font-extrabold mb-3 text-[#7ecbfa]">
            {celeb.name}
          </h1>
          <p className="mb-1"><span className="font-semibold">Role:</span> {celeb.role}</p>
          <p className="mb-3"><span className="font-semibold">Date of Birth:</span> {celeb.dob}</p>
          <p className="text-gray-700">{celeb.bio}</p>
        </div>
      </div>

      {/* Movies Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          🎬 Top 10 Movies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {celeb.topMovies.map((movie, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow hover:shadow-md hover:-translate-y-1 transition text-gray-700 text-center"
            >
              {movie}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CelebrityDetails;
