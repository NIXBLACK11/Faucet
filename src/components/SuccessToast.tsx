import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { successState } from '../atom';
import { GoXCircle } from 'react-icons/go';

export default function SuccessToast() {
  const [success, setSuccess] = useRecoilState(successState);

  useEffect(() => {
    if (success.show) {
      const timer = setTimeout(() => {
        setSuccess({ show: false, message: '' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success.show, setSuccess]);

  if (!success.show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <GoXCircle className="w-5 h-5" />
        <p className="text-sm font-medium">{success.message}</p>
      </div>
    </div>
  );
}