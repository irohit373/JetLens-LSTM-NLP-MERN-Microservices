import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MLStatusIndicator() {
  const [status, setStatus] = useState('checking');
  
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get('/api/ml-status');
        setStatus(response.data.mlServiceStatus);
      } catch (error) {
        setStatus('offline');
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  if (status === 'checking') {
    return (
      <div className="flex items-center text-xs text-gray-500">
        <div className="animate-pulse mr-1 h-2 w-2 rounded-full bg-gray-400"></div>
        Checking price prediction service...
      </div>
    );
  }
  
  return (
    <div className={`flex items-center text-xs ${status === 'online' ? 'text-green-600' : 'text-amber-500'}`}>
      <div className={`mr-1 h-2 w-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      {status === 'online' ? 'AI price prediction active' : 'Using estimated prices'} 
    </div>
  );
}
