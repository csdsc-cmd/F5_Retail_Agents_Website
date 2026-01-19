/**
 * APPROVED PATTERN: Express API Endpoint
 * 
 * This file is agent-maintained. Updated when better patterns emerge.
 * 
 * Use this structure for all API routes.
 */

// GET - Fetch all resources
router.get('/api/resources', async (req, res) => {
  try {
    const items = await Resource.findAll();
    res.json(items);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// GET - Fetch single resource by ID
router.get('/api/resources/:id', async (req, res) => {
  try {
    const item = await Resource.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

// POST - Create new resource
router.post('/api/resources', async (req, res) => {
  try {
    const { field1, field2 } = req.body;
    
    // Validate required fields
    if (!field1) {
      return res.status(400).json({ error: 'field1 is required' });
    }
    
    const item = await Resource.create({ field1, field2 });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// PUT - Update resource
router.put('/api/resources/:id', async (req, res) => {
  try {
    const item = await Resource.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({ error: 'Failed to update resource' });
  }
});

// DELETE - Remove resource
router.delete('/api/resources/:id', async (req, res) => {
  try {
    const item = await Resource.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    await item.destroy();
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});
