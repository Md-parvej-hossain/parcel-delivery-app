import Marquee from 'react-fast-marquee';
import RevioCard from './RevioCard';
import img from '../../../assets/customer-top.png';
const reviews = [
  {
    id: 1,
    name: 'Awladh Hossin',
    role: 'Senior Product Designer',
    review:
      'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    img: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 2,
    name: 'Nasir Uddin',
    role: 'CEO',
    review:
      'Excellent product! Helps maintain posture and reduces back pain effectively. Highly recommended for daily use.',
    img: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    name: 'Rasel Ahamed',
    role: 'CTO',
    review:
      'Very comfortable and lightweight. I felt the difference within a week of regular use.',
    img: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 2,
    name: 'Nasir Uddin',
    role: 'CEO',
    review:
      'Excellent product! Helps maintain posture and reduces back pain effectively. Highly recommended for daily use.',
    img: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 1,
    name: 'Awladh Hossin',
    role: 'Senior Product Designer',
    review:
      'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    img: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 3,
    name: 'Rasel Ahamed',
    role: 'CTO',
    review:
      'Very comfortable and lightweight. I felt the difference within a week of regular use.',
    img: 'https://i.pravatar.cc/150?img=20',
  },
];

export default function ReviewSlider() {
  return (
    <div className="py-10">
      <div
        className="max-w-4xl mx-auto text-center mb-10"
       
      >
        <div className="flex items-center justify-center py-5">
          <img className="" src={img} alt="" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          What our customers are saying
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mt-3">
          Enhance posture, mobility, and well-being with ease!
        </p>
      </div>
      <Marquee speed={80} pauseOnHover={true} gradient={false}>
        <div className="flex gap-5 mx-5 ">
          {reviews.map((item, index) => (
            <RevioCard key={index} item={item} />
          ))}
        </div>
      </Marquee>
    </div>
  );
}
