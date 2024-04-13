// PrivateAnalysis.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, collection, getDocs } from '../firebase'; // Update the import statements
import './PrivateAnalysis.css';

const PrivateAnalysis = () => {
  const [meditations, setMeditations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch meditations data from Firebase
    const fetchMeditations = async () => {
      try {
        const meditationsCollection = collection(db, 'meditations');
        const meditationsSnapshot = await getDocs(meditationsCollection);
        const data = meditationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMeditations(data);
        
      } catch (error) {
        console.error('Error fetching meditations:', error);
      }
    };

    fetchMeditations();
  }, []);




  const handleSearch = (e) => {
    // Perform live search based on the entered query
    setSearchQuery(e.target.value);
  };

  const filteredMeditations = meditations.filter(meditation =>
    meditation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='private-analysis'>
      <div className='search'>
        <input
          type="text"
          placeholder="Search meditations"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {filteredMeditations.map(meditation => (
          <Link key={meditation.id} to={`/meditate/${meditation.id}`}>
            <li>
              <p>{meditation.name}</p>
              <p>Duration: {meditation.duration}</p>
              <p>Tag: {meditation.tag}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PrivateAnalysis;
