#!/bin/bash

# Simple script to update GitHub repository
echo "🚀 Updating GitHub repository..."

# Add all changes
git add .

# Commit with timestamp
git commit -m "Update timeline - $(date)"

# Push to GitHub
git push origin main

echo "✅ Successfully updated GitHub repository!"
echo "🌐 View your repository at: https://github.com/heymachineni/mylifeindays" 