/**
 * APPROVED PATTERN: Error Handling
 * 
 * This file is agent-maintained. Updated when better patterns emerge.
 * 
 * Use these patterns for consistent error handling.
 */

// ============================================
// BACKEND: Route Error Handling
// ============================================
router.get('/api/resource', async (req, res) => {
  try {
    const result = await someOperation();
    res.json(result);
  } catch (error) {
    // Always log with context
    console.error('Error in GET /api/resource:', error);
    
    // Return user-friendly message with appropriate status
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    // Generic server error (don't expose internals)
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


// ============================================
// FRONTEND: Fetch Error Handling
// ============================================
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch('/api/resource');
    
    // Check HTTP status
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    setData(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // User-friendly error message
    if (error.message.includes('Failed to fetch')) {
      setError('Unable to connect to server. Please check your connection.');
    } else {
      setError(error.message || 'Something went wrong');
    }
  } finally {
    setLoading(false);
  }
};


// ============================================
// ASYNC FUNCTION: Wrapper Pattern
// ============================================
const safeAsync = async (fn, context) => {
  try {
    return await fn();
  } catch (error) {
    console.error(`Error in ${context}:`, error);
    throw error;
  }
};

// Usage:
const result = await safeAsync(
  () => Model.findAll(),
  'fetching all models'
);


// ============================================
// VALIDATION: Input Checking
// ============================================
const validateInput = (data, requiredFields) => {
  const errors = [];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`${field} is required`);
    }
  }
  
  if (errors.length > 0) {
    const error = new Error(errors.join(', '));
    error.name = 'ValidationError';
    throw error;
  }
  
  return true;
};

// Usage:
validateInput(req.body, ['name', 'email']);
