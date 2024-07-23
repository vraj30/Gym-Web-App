import React, { useRef } from 'react';
import './WorkoutSessions.css';

const WorkoutSessions = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -250, // Adjust scroll amount as needed
        behavior: 'smooth', // Smooth scroll animation
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 250, // Adjust scroll amount as needed
        behavior: 'smooth', // Smooth scroll animation
      });
    }
  };

  return (
    <section className="workout_session">
      <div className="wrapper">
        <h1>WHAT WE HAVE FOR YOU</h1>
        <p>Explore our diverse range of fitness classes designed to meet all your workout needs. From calming yoga to high-energy Zumba, we have something for everyone. Discover the perfect class to help you achieve your fitness goals and enjoy the journey to a healthier you.</p>
        <div className="scroll-container">
          <div className="classes" ref={scrollRef}>
            {/* Workout class items */}
            <div className="class-item">
              <img src="/yoga.png" alt="Yoga Classes" />
              <h4>Yoga Classes</h4>
              <p>Find your inner peace and improve your flexibility with our yoga classes. Suitable for all levels, our classes focus on breath control, meditation, and various postures to enhance your physical and mental well-being.</p>
            </div>
            <div className="class-item">
              <img src="/zumba.png" alt="Zumba Classes" />
              <h4>Zumba Classes</h4>
              <p>Dance your way to fitness with our high-energy Zumba classes. Set to lively music, these sessions are designed to make you sweat and have fun at the same time, perfect for those who love to move to the beat.</p>
            </div>
            <div className="class-item">
              <img src="/weightTrain.png" alt="Weight Training" />
              <h4>Weight Training</h4>
              <p>Build strength and muscle with our weight training classes. Our expert trainers will guide you through exercises that target all major muscle groups, helping you achieve your fitness and body composition goals.</p>
            </div>
            <div className="class-item">
              <img src="/crossfit.png" alt="CrossFit Classes" />
              <h4>CrossFit Classes</h4>
              <p>Challenge yourself with our CrossFit classes, which combine weight lifting, cardio, and functional movements for a high-intensity workout. Perfect for those looking to push their limits and improve overall fitness.</p>
            </div>
            <div className="class-item">
              <img src="/pt.png" alt="Personal Training" />
              <h4>Personal Training</h4>
              <p>Get personalized attention and a customized workout plan with our personal training sessions. Whether you have specific fitness goals or need extra motivation, our trainers are here to help you succeed.</p>
            </div>
            <div className="class-item">
              <img src="/cardio.png" alt="Cardio Classes" />
              <h4>Cardio</h4>
              <p>Boost your heart health and endurance with our cardio classes. These sessions are designed to keep your heart rate up and burn calories through various aerobic exercises.</p>
            </div>
            {/* End of workout class items */}
          </div>
          {/* Navigation buttons */}
          <div className="scroll-buttons">
            <button onClick={scrollLeft} className="scroll-button-left">{'<'}</button>
            <button onClick={scrollRight} className="scroll-button-right">{'>'}</button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default WorkoutSessions;
