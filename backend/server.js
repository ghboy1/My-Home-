// Critical env vars - crash early if missing
const requiredEnv = ['MONGODB_URI', 'JWT_SECRET', 'ADMIN_PASSWORD'];
requiredEnv.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`\n❌ MISSING ENV VAR: ${varName}`);
    console.error(`   Add it in Render Dashboard → Environment Variables\n`);
    process.exit(1);
  }
});

console.log('✅ All required environment variables loaded');

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();

// MongoDB Connection (with retry options)
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Post Schema (renamed 'errors' to 'postErrors' to avoid Mongoose warning)
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: String,
  platforms: [String],
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'posted', 'failed'],
    default: 'draft' 
  },
  scheduledFor: Date,
  tags: [String],
  results: [{
    platform: String,
    success: Boolean,
    message: String,
    postId: String,
    postedAt: Date
  }],
  postErrors: [{
    platform: String,
    error: String,
    timestamp: Date
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Auth Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ============ ROUTES ============

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password required' 
      });
    }
    
    // Compare password with environment variable
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid password' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { admin: true, loginTime: Date.now() },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed' 
    });
  }
});

// Verify Token Route
app.get('/api/verify', verifyToken, (req, res) => {
  res.json({ success: true, admin: true });
});

// Get All Posts
app.get('/api/posts', verifyToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      posts,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch posts' 
    });
  }
});

// Get Single Post
app.get('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch post' 
    });
  }
});

// Create Post
app.post('/api/posts', verifyToken, async (req, res) => {
  try {
    const { title, content, media, platforms, scheduledFor, tags } = req.body;
    
    if (!title || !content || !platforms || platforms.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, content, and platforms are required' 
      });
    }

    // Validate platforms (add your supported platforms here)
    const validPlatforms = ['twitter', 'linkedin', 'facebook'];  // Customize as needed
    if (!platforms.every(p => validPlatforms.includes(p))) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid platforms. Supported: ${validPlatforms.join(', ')}` 
      });
    }
    
    const post = await Post.create({
      title,
      content,
      media,
      platforms,
      scheduledFor: scheduledFor || null,
      tags: tags || [],
      status: scheduledFor ? 'scheduled' : 'draft'
    });
    
    // Schedule if needed
    if (scheduledFor && new Date(scheduledFor) > new Date()) {
      schedulePost(post);
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Post created successfully',
      post 
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create post' 
    });
  }
});

// Update Post
app.put('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    if (post.status === 'posted') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot update published posts' 
      });
    }

    // Validate platforms if updated
    if (req.body.platforms && !req.body.platforms.every(p => ['twitter', 'linkedin', 'facebook'].includes(p))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid platforms. Supported: twitter, linkedin, facebook' 
      });
    }
    
    Object.assign(post, req.body);
    post.updatedAt = new Date();
    await post.save();
    
    // Re-schedule if scheduledFor changed
    if (req.body.scheduledFor && new Date(req.body.scheduledFor) > new Date()) {
      schedulePost(post);
    }
    
    res.json({ 
      success: true, 
      message: 'Post updated successfully',
      post 
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update post' 
    });
  }
});

// Delete Post
app.delete('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    // Cancel scheduled job if exists
    cancelScheduledPost(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete post' 
    });
  }
});

// Publish Post Now
app.post('/api/posts/:id/publish', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    await publishPost(post);
    
    const updatedPost = await Post.findById(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Post published successfully',
      post: updatedPost 
    });
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to publish post' 
    });
  }
});

// Get Stats
app.get('/api/stats', verifyToken, async (req, res) => {
  try {
    const stats = await Post.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const result = {
      total: 0,
      draft: 0,
      scheduled: 0,
      posted: 0,
      failed: 0
    };
    
    stats.forEach(stat => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });
    
    res.json({ success: true, stats: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stats' 
    });
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Content Manager API is running'
  });
});

// ============ SCHEDULER ============

const schedule = require('node-schedule');
const scheduledJobs = new Map();

// Publish function (improved with better error simulation/handling for future real integrations)
async function publishPost(post) {
  console.log(`📤 Publishing: ${post.title}`);
  
  const results = [];
  const postErrors = [];
  
  for (const platform of post.platforms) {
    let success = true;
    let message = `Posted to ${platform}`;
    let postId = `${platform}_${Date.now()}`;
    
    try {
      // TODO: Real integration here, e.g.:
      // if (platform === 'twitter') { await postToTwitter(post); }
      // else if (platform === 'linkedin') { await postToLinkedIn(post); }
      
      // Simulator (add a rare random "error" for testing)
      if (Math.random() < 0.1) {  // 10% simulated failure
        throw new Error(`Simulator error: ${platform} API timeout`);
      }
      
      // Simulator logs
      console.log(`\n📱 ${platform.toUpperCase()}`);
      console.log(`Title: ${post.title}`);
      console.log(`Content: ${post.content}`);
      if (post.media) console.log(`Media: ${post.media}`);
      
    } catch (error) {
      success = false;
      message = `Failed: ${error.message}`;
      postErrors.push({
        platform,
        error: error.message,
        timestamp: new Date()
      });
      console.error(`❌ ${platform} error:`, error.message);
    }
    
    results.push({
      platform,
      success,
      message,
      postId,
      postedAt: new Date()
    });
  }
  
  post.results = results;
  post.postErrors = postErrors;
  post.status = postErrors.length > 0 ? 'failed' : 'posted';
  post.updatedAt = new Date();
  await post.save();
  
  console.log(`✅ Published: ${post.title} (${postErrors.length} errors)`);
}

// Schedule post
function schedulePost(post) {
  const postId = post._id.toString();
  const scheduledTime = new Date(post.scheduledFor);
  
  if (scheduledJobs.has(postId)) {
    scheduledJobs.get(postId).cancel();
  }
  
  const job = schedule.scheduleJob(scheduledTime, async () => {
    const latestPost = await Post.findById(postId);
    if (latestPost && latestPost.status === 'scheduled') {
      await publishPost(latestPost);
    }
    scheduledJobs.delete(postId);
  });
  
  scheduledJobs.set(postId, job);
  console.log(`📅 Scheduled: ${post.title} for ${scheduledTime}`);
}

// Cancel scheduled post
function cancelScheduledPost(postId) {
  if (scheduledJobs.has(postId)) {
    scheduledJobs.get(postId).cancel();
    scheduledJobs.delete(postId);
    console.log(`🚫 Cancelled: ${postId}`);
  }
}

// Initialize scheduler on startup
async function initScheduler() {
  const scheduledPosts = await Post.find({
    status: 'scheduled',
    scheduledFor: { $gte: new Date() }
  });
  
  console.log(`🔄 Loading ${scheduledPosts.length} scheduled posts...`);
  scheduledPosts.forEach(post => schedulePost(post));
}

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log('\n========================================');
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🌐 Frontend: ${process.env.FRONTEND_URL}`);
  console.log('========================================\n');
  
  await initScheduler();
  console.log('✅ Content Manager Ready!\n');
});