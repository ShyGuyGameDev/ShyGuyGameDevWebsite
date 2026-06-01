import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const clipsDirectory = path.join(process.cwd(), 'public', 'Clips')
    
    // Check if directory exists
    if (!fs.existsSync(clipsDirectory)) {
      console.error('Clips directory not found:', clipsDirectory)
      return NextResponse.json({ videos: [] })
    }
    
    const files = fs.readdirSync(clipsDirectory)
    const videos = files
      .filter(file => {
        const ext = file.toLowerCase()
        return ext.endsWith('.mp4') || ext.endsWith('.webm') || ext.endsWith('.mov')
      })
      .map(file => `/Clips/${file}`)
    
    console.log('Videos found:', videos)
    
    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Error reading clips directory:', error)
    return NextResponse.json({ videos: [] }, { status: 500 })
  }
}