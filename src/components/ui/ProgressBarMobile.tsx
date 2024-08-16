import useOnScreen from '@/hooks/useOnScreen';
import { CircleCheck } from 'lucide-react';

type ProgressBarProps = {
  status: string;
};

const ProgressBarMobile = ({ status }: ProgressBarProps) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  // Define progress levels based on your indicators' positions
  const progress = isVisible ? (status === "Placed" ? 0.33 : 0.67) : 0; // Assuming progress bar fills to 67% when visible

  return (
    <div className="relative w-full">

         {/* Progress Bar */}
      <div ref={ref} className="relative  h-72 w-2.5 rounded-sm overflow-hidden  bg-white border">
        <div
          className={`absolute w-full bg-slate-300 rounded-full`}
          style={{ height: `${progress * 100}%`, transition: 'height 1s ease-out' }}
        ></div>
      </div>

      {/* Labels */}
      <div className="absolute left-5  top-[30%] text-gray-900 text-xs font-medium">
        Order Placed
      </div>
      <div className="absolute left-5  top-[64%] text-gray-900 text-xs font-medium">
        Shipped
      </div>
      <div className="absolute left-5 top-[90%] text-gray-900 text-xs font-medium">
        Out for Delivery
      </div>
      
     
      
      {/* Circular Indicators */}
      <div>
        <CircleCheck className={`absolute top-1/3  transform -translate-x-1/3 -translate-y-1/2 bg-white ${
        progress >= 0.33 ? 'text-green-300' : 'text-gray-300 '
      }`}/></div>
      <div>
        <CircleCheck className={`absolute  top-2/3 transform -translate-x-1/3 -translate-y-1/2 bg-white ${
        progress >= 0.67 ? 'text-green-300' : 'text-gray-300 '
      }`}/></div>
      <div>
        <CircleCheck className={`absolute bottom-0 transform -translate-x-1/3 -translate-y-1/2 bg-white ${
        progress >= 1 ? 'text-green-300' : 'text-gray-300 '
      }`}/></div>
    </div>
  );
};

export default ProgressBarMobile;