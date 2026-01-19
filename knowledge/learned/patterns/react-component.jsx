/**
 * APPROVED PATTERN: React Functional Component
 * 
 * This file is agent-maintained. Updated when better patterns emerge.
 * 
 * Use this structure for all React components.
 */

import React, { useState, useEffect } from 'react';
import './ComponentName.css';

function ComponentName({ prop1, prop2, onAction }) {
  // ============================================
  // 1. STATE DECLARATIONS (always first)
  // ============================================
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // 2. EFFECTS (after state)
  // ============================================
  useEffect(() => {
    fetchData();
  }, [prop1]); // Specify dependencies

  // ============================================
  // 3. DATA FETCHING FUNCTIONS
  // ============================================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/resources');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 4. EVENT HANDLERS
  // ============================================
  const handleClick = (item) => {
    if (onAction) {
      onAction(item);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
  };

  // ============================================
  // 5. RENDER HELPERS (if needed)
  // ============================================
  const renderItem = (item) => (
    <div key={item.id} className="component-name__item">
      {item.name}
    </div>
  );

  // ============================================
  // 6. CONDITIONAL RENDERS
  // ============================================
  if (loading) {
    return <div className="component-name--loading">Loading...</div>;
  }

  if (error) {
    return <div className="component-name--error">{error}</div>;
  }

  // ============================================
  // 7. MAIN RENDER (always last)
  // ============================================
  return (
    <div className="component-name">
      <h2 className="component-name__title">{prop1}</h2>
      
      <div className="component-name__content">
        {data.map(renderItem)}
      </div>
      
      <button 
        className="component-name__button"
        onClick={() => handleClick(data[0])}
      >
        Action
      </button>
    </div>
  );
}

export default ComponentName;
