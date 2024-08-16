import useOnScreen from '@/hooks/useOnScreen';
import {  CircleCheck } from 'lucide-react';

type ProgressBarProps = {
  
  status: string;
};

const ProgressBar = ({status}:ProgressBarProps) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  

  // Define progress levels based on your indicators' positions
  const progress = isVisible ? status==="Placed"?0.33:0.67 : 0; // Assuming progress bar fills to 67% when visible

  return (
    <div className="relative w-full">
      {/* Labels */}
      <div className="absolute left-1/3 right-1 -top-8 text-gray-900 text-xs font-medium">
        Order Placed
      </div>
      <div className="absolute left-2/3 -top-8 text-gray-900 text-xs font-medium">
        Shipped
      </div>
      <div className="absolute right-0 -top-8 text-gray-900 text-xs font-medium">
        Out for Delivery
      </div>
      
      {/* Progress Bar */}
      <div ref={ref} className="relative h-2.5 w-full overflow-hidden rounded-full bg-white border">
        <div
          className={`absolute h-full bg-slate-300 rounded-full`}
          style={{ width: `${progress * 100}%`, transition: 'width 1s ease-out' }}
        ></div>
      </div>
      
      {/* Circular Indicators */}
      <div>
        <CircleCheck className={`absolute left-1/3 top-1/2 transform -translate-x-1/3 -translate-y-1/2 bg-white ${
        progress >= 0.33 ? 'text-green-300' : 'text-gray-300 '
      }`}/></div>
      <div>
        <CircleCheck className={`absolute left-2/3 top-1/2 transform -translate-x-1/3 -translate-y-1/2 bg-white ${
        progress >= 0.67 ? 'text-green-300' : 'text-gray-300 '
      }`}/></div>
      <div>
        <CircleCheck className={`absolute right-0 top-1/2 transform -translate-x-1/3 -translate-y-1/2 bg-white ${
        progress >= 1 ? 'text-green-300' : 'text-gray-300 '
      }`}/></div>
    </div>
  );
};

export default ProgressBar;
