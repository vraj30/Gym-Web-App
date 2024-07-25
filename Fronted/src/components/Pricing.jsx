import { Check } from 'lucide-react';
import { Link } from "react-router-dom";
import React from 'react';

const Pricing = () => {
  const pricing = [
    {
      imgUrl: "/pricing.jpg",
      title: "MONTHLY",
      price: 1999,
      length: 1,
      description: [
        "All Equipment and Machine Access",
        "Fully Air Conditioned",
        "Free Restroom",
        "Free Locker Access",
        "24/7 Skilled Support"
      ]
    },
    {
      imgUrl: "/pricing.jpg",
      title: "HALF_YEARLY",
      price: 8999,
      length: 6,
      description: [
        "All Equipment and Machine Access",
        "Fully Air Conditioned",
        "Free Restroom",
        "Free Locker Access",
        "Access to Group Fitness Classes",
        "24/7 Skilled Support",
       "Complimentary Health Check-Up",
        "1 Yoga Session & 1 Zumba Class per month"
      ]
    },
    {
      imgUrl: "/pricing.jpg",
      title: "YEARLY",
      price: 17999,
      length: 12,
      description: [
        "All Equipment and Machine Access",
        "Fully Air Conditioned",
        "Free Restroom",
        "Free Locker Access",
        "Access to Group Fitness Classes",
        "24/7 Skilled Support",
        "Complimentary Health Check-Up",
         "Free Nutrition Counseling Session",
        "2 Yoga Session & 2 Zumba classes per month"
      ]
    }
  ];

  return (
    <section className="pricing">
      <h1>POWER HOUSE GYM'S PLANS</h1>
      <div className="wrapper">
        {pricing.map(element => (
          <div className="card" key={element.title}>
            <img src={element.imgUrl} alt={element.title} />
            <div className="title">
              <h1>{element.title}</h1>
              <h1>PACKAGE</h1>
              <h3>Rs: {element.price}</h3>
              <p>For {element.length} Months</p>
            </div>
            <div className="description">
              {element.description.map((desc, index) => (
                <p key={index}>
                  <Check /> {desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="enroll-now-button">
        <Link to="/enroll">Contact for Enrollment</Link>
      </div>
    </section>
  );
};

export default Pricing;
