// import './TopCompanies.css';
// import { FaStar } from 'react-icons/fa';

// interface Company {
//   name: string;
//   rating: number;
//   logo: string;
// }

// const companies: Company[] = [
//   { name: "Google", rating: 4.8, logo: "/logos/google.png" },
//   { name: "Amazon", rating: 4.6, logo: "/logos/amazon.png" },
//   { name: "Google", rating: 4.8, logo: "/logos/google.png" },
//   { name: "Amazon", rating: 4.6, logo: "/logos/amazon.png" },
//   { name: "Google", rating: 4.8, logo: "/logos/google.png" },
//   { name: "Amazon", rating: 4.6, logo: "/logos/amazon.png" },
//   // add more...
// ];

// const TopCompanies = () => {
//   return (
//     <div className="top-companies-section">
//       <h2>Top Companies Hiring Now</h2>
//       <div className="companies-carousel">
//         {companies.map((c,i) => (
//           <div key={i} className="company-card">
//             <img src={c.logo} alt={c.name} className="company-logo"/>
//             <p className="company-name">{c.name}</p>
//             <p className="company-rating"><FaStar color="#facc15"/> {c.rating}</p>
//             <button className="view-jobs">View Jobs</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopCompanies;
// import './TopCompanies.css';
// import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useState } from 'react';

// interface Company { name: string; rating: number; logo: string; }

// const companies: Company[] = [
//   { name: "Google", rating: 4.8, logo: "/logos/google.png" },
//   { name: "Amazon", rating: 4.6, logo: "/logos/amazon.png" },
//   { name: "Microsoft", rating: 4.7, logo: "/logos/microsoft.png" },
//   { name: "Facebook", rating: 4.5, logo: "/logos/facebook.png" },
//   // More companies...
// ];

// const TopCompanies = () => {
//   const [index, setIndex] = useState(0);
//   const maxIndex = Math.max(0, companies.length - 4);

//   const prev = () => setIndex(i => Math.max(0, i - 1));
//   const next = () => setIndex(i => Math.min(maxIndex, i + 1));

//   return (
//     <div className="top-companies-wrapper">
//       <h2>Top Companies Hiring Now</h2>
//       <div className="controls">
//         <FaChevronLeft onClick={prev} className={`arrow ${index === 0 ? 'disabled' : ''}`} />
//         <div className="companies-carousel">
//           {companies.slice(index, index + 4).map((c, i) => (
//             <div key={i} className="company-card">
//               <img src={c.logo} alt={`${c.name} logo`} className="company-logo"/>
//               <p className="company-name">{c.name}</p>
//               <p className="company-rating"><FaStar color="#facc15"/> {c.rating}</p>
//               <button className="view-jobs">View Jobs</button>
//             </div>
//           ))}
//         </div>
//         <FaChevronRight onClick={next} className={`arrow ${index === maxIndex ? 'disabled' : ''}`} />
//       </div>
//     </div>
//   );
// };

// export default TopCompanies;

import './TopCompanies.css';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef } from 'react';

interface Company {
  name: string;
  rating: number;
  logo: string;
}

const companies: Company[] = [
  { name: "Google", rating: 4.8, logo: '/logos/google.svg' },
  { name: "Amazon", rating: 4.6, logo: "/logos/amazon.svg" },
  { name: "Microsoft", rating: 4.7, logo: "/logos/microsoft.svg" },
  { name: "Facebook", rating: 4.5, logo: "/logos/facebook.svg" },
  { name: "Netflix", rating: 4.4, logo: "/logos/netflix.svg" },
  { name: "Adobe", rating:4.4, logo:"/logos/adobe.svg"}
];

const TopCompanies = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 200;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="top-companies-wrapper">
      <h2>Top Companies Hiring Now</h2>
      <p className="subtext">Explore hundreds of opportunities crafted for you</p>
      <div className="controls">
        <FaChevronLeft onClick={() => scroll('left')} className="arrow" />
        <div className="companies-carousel" ref={carouselRef}>
          {companies.map((c, i) => (
            <div key={i} className="company-card">
              <img src={c.logo} alt={`${c.name} logo`} className="company-logo" />
              <p className="company-name">{c.name}</p>
              <p className="company-rating"><FaStar color="#facc15" /> {c.rating}</p>
              <button className="view-jobs">View Jobs</button>
            </div>
          ))}
        </div>
        <FaChevronRight onClick={() => scroll('right')} className="arrow" />
      </div>
    </div>
  );
};

export default TopCompanies;
