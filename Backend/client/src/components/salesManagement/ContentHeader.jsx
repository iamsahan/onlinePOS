import React, { useEffect, useState } from 'react';
import { BiNotification, BiSearch } from 'react-icons/bi';

const ContentHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content-header">
      <p className="header-title">
        Date: {time.toLocaleDateString()} | Time: {time.toLocaleTimeString()}
      </p>
      <p className="header-title2">
        Order: {Date.now()}
      </p>
    </div>
  );
};

export default ContentHeader;
