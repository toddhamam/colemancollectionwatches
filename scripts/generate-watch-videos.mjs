#!/usr/bin/env node

/**
 * Generate watch videos using Kling AI API
 * Usage: node scripts/generate-watch-videos.mjs
 *
 * Requires KLING_ACCESS_KEY and KLING_SECRET_KEY in .env.local
 */

import { KlingAPI } from 'kling-api'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load env
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf-8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
}

const api = new KlingAPI({
  accessKey: process.env.KLING_ACCESS_KEY,
  secretKey: process.env.KLING_SECRET_KEY,
})

const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'watches')
const FRAMES_DIR = path.join(ROOT, 'public', 'frames')

const VIDEOS = [
  {
    name: 'hero-rotating-watch',
    prompt:
      'Cinematic 3D render of a luxury mechanical wristwatch slowly rotating 360 degrees on its axis. The watch has a black dial with gold hour markers, gold hands, exhibition caseback showing intricate mechanical movement, polished gold case, and black leather strap. Pure black background, dramatic studio lighting with soft highlights on the polished metal surfaces. Ultra realistic, photorealistic render, 8K quality, no text, no watermark.',
    filename: 'hero-rotating-watch.mp4',
  },
  {
    name: 'exploding-watch-view',
    prompt:
      'High quality 3D exploding view animation of a luxury mechanical wristwatch smoothly deconstructing into its individual components. The bezel, crystal, dial, hour markers, hands, movement, mainspring, gears, caseback, crown, and strap all separate and float apart in all directions revealing the intricate internal mechanism. Gold and silver metallic components, pure black background, dramatic studio lighting. Ultra realistic, smooth animation, no text, no watermark.',
    filename: 'exploding-watch-view.mp4',
  },
]

async function generateVideo(config) {
  console.log(`\n🎬 Generating: ${config.name}`)
  console.log(`   Prompt: ${config.prompt.slice(0, 80)}...`)

  const task = await api.textToVideo({
    prompt: config.prompt,
    model_name: 'kling-v2-master',
    duration: '5',
    aspect_ratio: '16:9',
    mode: 'std',
  })

  const taskId = task.data.task_id
  console.log(`   Task ID: ${taskId}`)
  console.log(`   Polling for result (this may take 5-10 minutes)...`)

  const result = await api.waitForVideoResult(taskId)
  const videoUrl = result.data.task_result.videos[0].url

  console.log(`   Video ready! Downloading...`)

  const outputPath = path.join(OUTPUT_DIR, config.filename)
  const response = await fetch(videoUrl)
  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(outputPath, buffer)

  console.log(`   Saved to: ${outputPath}`)
  return outputPath
}

async function extractFrames(videoPath, outputPrefix) {
  const framesSubdir = path.join(FRAMES_DIR, outputPrefix)
  fs.mkdirSync(framesSubdir, { recursive: true })

  console.log(`\n📸 Extracting frames from ${path.basename(videoPath)}...`)

  // Extract at 30fps as optimized JPEGs
  try {
    execSync(
      `ffmpeg -i "${videoPath}" -vf "fps=30" -q:v 2 "${framesSubdir}/frame_%04d.jpg" -y`,
      { stdio: 'pipe' }
    )
    const frameCount = fs.readdirSync(framesSubdir).filter((f) => f.endsWith('.jpg')).length
    console.log(`   Extracted ${frameCount} frames to ${framesSubdir}/`)
    return { dir: framesSubdir, count: frameCount }
  } catch (e) {
    console.log(
      `   ⚠️  ffmpeg not found or failed. Install ffmpeg to extract frames.`
    )
    console.log(`   Video saved at: ${videoPath}`)
    console.log(`   Run manually: ffmpeg -i "${videoPath}" -vf "fps=30" -q:v 2 "${framesSubdir}/frame_%04d.jpg"`)
    return null
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('Coleman Collection Watches — Kling AI Video Generator')
  console.log('='.repeat(60))

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.mkdirSync(FRAMES_DIR, { recursive: true })

  const results = []

  for (const video of VIDEOS) {
    try {
      const videoPath = await generateVideo(video)
      results.push({ ...video, videoPath, success: true })
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`)
      results.push({ ...video, success: false, error: err.message })
    }
  }

  // Extract frames from the exploding view for scroll animation
  const exploding = results.find(
    (r) => r.name === 'exploding-watch-view' && r.success
  )
  if (exploding) {
    await extractFrames(exploding.videoPath, 'exploding-watch')
  }

  console.log('\n' + '='.repeat(60))
  console.log('Summary:')
  for (const r of results) {
    console.log(
      `  ${r.success ? '✅' : '❌'} ${r.name}: ${r.success ? r.videoPath : r.error}`
    )
  }
  console.log('='.repeat(60))
}

main().catch(console.error)
