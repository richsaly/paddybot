// import React from 'react';
// import bg1 from '../assets/bg1.png';


// function Hero() {
//   return (
//     <section 
//     className='min-h-screen bg-cover bg-center flex flex-col items-center justify-center'
//     style={{
//         backgroundImage: `url(${bg1})`,
//     }}
//     >
//       <div className="flex flex-col items-center h-screen justify-center">

//         {/* Hero text */}
//         <h1 className="text-7xl mt-40  font-bold  text-white">
//           TALK TO SOMEONE ANYT<span className='text-red-600 animate-pulse'>I</span>ME
//         </h1>

//          {/* CTA Buttons */}
//         <div className="flex py-20 items-center gap-10">

//           {/* Primary Button */}
//           <button className="bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 animate-bounce">
//             Start Talking
//           </button>

//           {/* Secondary Button */}
//           <button className="border-2 border-white text-red-500 font-bold text-lg px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 hover:text-white hover:scale-105 transition-all duration-300">
//             Learn More
//           </button>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default Hero;


import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../assets/bg1.png';

function Hero() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${bg1})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Hero text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-5xl">
          TALK TO SOMEONE ANYT
          <span className="text-red-600 animate-pulse">I</span>
          ME
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
          
          {/* Primary Button */}
          <Link to="/signup">
            <button className="bg-red-500 text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 animate-bounce">
              Start Talking
            </button>
          </Link>

          {/* Secondary Button */}
          <button
              onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            
          className="border-2 border-white text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-blue-800 hover:border-blue-800 hover:text-white hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;