import React from 'react';

const Gallery = () => {
  const gallery = [
    "/ph1.jpeg", "/ph2.jpg", "/ph3.jpg", "/ph4.jpg",
    "/ph5.jpg", "/ph6.jpg", "/ph7.jpg", "/ph8.png"
  ];

  return (
    <section className="gallery">
      <h1>BETTER BEATS BEST</h1>
      <div className="images">
        <div>
          {
            gallery.slice(0, 3).map((element, index) => (
              <img key={index} src={element} alt="galleryImage" />
            ))
          }
        </div>

        <div>
          {
            gallery.slice(3, 6).map((element, index) => (
              <img key={index} src={element} alt="galleryImage" />
            ))
          }
        </div>

        <div>
          {
            gallery.slice(6, 8).map((element, index) => (
              <img key={index} src={element} alt="galleryImage" />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Gallery;
