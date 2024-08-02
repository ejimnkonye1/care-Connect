import  { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

// eslint-disable-next-line react/prop-types
const LastUpdated = ({ triggerUpdate }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (triggerUpdate) {
      setLastUpdated(new Date());
    }
  }, [triggerUpdate]);

  const formatDate = (date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="stats">
      <i className="fa fa-clock-o"></i> Updated {formatDate(lastUpdated)}
    </div>
  );
};

export default LastUpdated;
