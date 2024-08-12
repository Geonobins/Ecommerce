import { AppDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
// Adjust the import path as needed

const useThunkDispatch = () => {
  return useDispatch<AppDispatch>();
};

export default useThunkDispatch;