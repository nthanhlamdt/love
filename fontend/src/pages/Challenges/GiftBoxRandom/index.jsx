/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react'
import MySvgComponent from '../GiftBoxSVG'

export default function GiftBoxRandom({ image }) {
  const canvasRef = useRef(null)
  const [showFireworks, setShowFireworks] = useState(false)
  const [isShaking, setIsShaking] = useState(true)
  const [showGift, setShowGift] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let fireworks = []
    let particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    class Firework {
      constructor(sx, sy, tx, ty) {
        this.x = sx
        this.y = sy
        this.sx = sx
        this.sy = sy
        this.tx = tx
        this.ty = ty
        this.distanceToTarget = calculateDistance(sx, sy, tx, ty)
        this.distanceTraveled = 0
        this.coordinates = []
        this.coordinateCount = 3
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y])
        }
        this.angle = Math.atan2(ty - sy, tx - sx)
        this.speed = 2
        this.acceleration = 1.05
        this.brightness = random(50, 70)
        this.targetRadius = 1
      }

      update(index) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        if (this.targetRadius < 8) {
          this.targetRadius += 0.3
        } else {
          this.targetRadius = 1
        }
        this.speed *= this.acceleration
        const vx = Math.cos(this.angle) * this.speed
        const vy = Math.sin(this.angle) * this.speed
        this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy)
        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.tx, this.ty)
          fireworks.splice(index, 1)
        } else {
          this.x += vx
          this.y += vy
        }
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.coordinates = []
        this.coordinateCount = 5
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y])
        }
        this.angle = random(0, Math.PI * 2)
        this.speed = random(1, 10)
        this.friction = 0.95
        this.gravity = 1
        this.hue = random(hue - 20, hue + 20)
        this.brightness = random(50, 80)
        this.alpha = 1
        this.decay = random(0.015, 0.03)
      }

      update(index) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        this.speed *= this.friction
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + this.gravity
        this.alpha -= this.decay
        if (this.alpha <= this.decay) {
          particles.splice(index, 1)
        }
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`
        ctx.stroke()
      }
    }

    let hue = 120
    let timerTotal = 80
    let timerTick = 0

    function random(min, max) {
      return Math.random() * (max - min) + min
    }

    function calculateDistance(p1x, p1y, p2x, p2y) {
      const xDistance = p1x - p2x
      const yDistance = p1y - p2y
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
    }

    function createParticles(x, y) {
      let particleCount = 30
      while (particleCount--) {
        particles.push(new Particle(x, y))
      }
    }

    function loop() {
      requestAnimationFrame(loop)

      if (!showFireworks) return

      hue += 0.5
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      let i = fireworks.length
      while (i--) {
        fireworks[i].draw()
        fireworks[i].update(i)
      }
      i = particles.length
      while (i--) {
        particles[i].draw()
        particles[i].update(i)
      }
      if (timerTick >= timerTotal) {
        fireworks.push(new Firework(canvas.width / 2, canvas.height, random(0, canvas.width), random(0, canvas.height / 2)))
        timerTick = 0
      } else {
        timerTick++
      }
    }

    loop()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [showFireworks])

  const handleGiftClick = () => {
    setShowFireworks(true)
    setIsShaking(false)
    setTimeout(() => {
      setShowGift(true)
    }, 3000) // Hiển thị quà sau 3 giây
  }

  return (
    <div className='fixed inset-0 z-[9999]'>
      <div className="min-h-screen bg-gradient-to-b from-[#190e14] via-[#0d0d4b] to-[#c76075] overflow-hidden flex items-center justify-center relative">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
        {!showFireworks && (
          <div
            className={`relative cursor-pointer transform transition-transform duration-300 hover:scale-105 ${isShaking ? 'animate-shake' : ''}`}
            onClick={handleGiftClick}
          >
            <MySvgComponent />
          </div>
        )}

        {showGift && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-fade-in">
            <img
              src={image}
              alt="Món quà của bạn"
              width={200}
              height={200}
              className="mx-auto mb-4 rounded-lg shadow-lg"
            />
            <h2 className="text-3xl font-bold text-white mb-2">Chúc mừng!</h2>
            <p className="text-xl text-white">Bạn đã nhận được một món quà đặc biệt!</p>
          </div>
        )}

        <style jsx>{`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
          }
          
          .animate-shake {
            animation: shake 0.5s ease-in-out infinite;
          }
          
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .animate-fade-in {
            animation: fade-in 1s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  )
}
