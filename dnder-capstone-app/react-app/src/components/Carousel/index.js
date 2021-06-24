import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

// const responsive = {
//   0: { items: 1 },
//   // 568: { items: 2 },
//   // 1024: { items: 3 },
// };

const items = [
  <div>
    <div className='img-text'>
      After Logging in or Signing up, press the button at the center of either card to create your own PC or DM.
    </div>
    <img src="https://i.imgur.com/Ad74PxS.png" className='instruct-img-1' onDragStart={handleDragStart} />
  </div>,
  <div>
    <div className='img-text'>Once you've made a PC or DM card then you can search for other PCs or DMs by clicking on the button above your card.</div>
    <img src="https://i.imgur.com/DR2eNoz.png" className='instruct-img-1' onDragStart={handleDragStart} />
  </div>,
  <div>
    <div className='img-text'>Click and drag a card to the right to attempt to match with a PC/DM or drag left if you don't want to match.</div>
    <img src="https://i.imgur.com/hgH8LMs.png" className='instruct-img-1' onDragStart={handleDragStart} />
  </div>,
  <div>
    <div className='img-text'>If the person you swiped right on also swipes right on you then you will match with them and your matches will show up here.</div>
    <img src="https://i.imgur.com/8dEB1Bq.png" className='instruct-img-1' onDragStart={handleDragStart} />
  </div>,
];

const Carousel = () => {
  return (
    <AliceCarousel
      mouseTracking items={items}
      // responsive={responsive}
      // controlsStrategy="alternate"
    />
  );
}

export default Carousel;
