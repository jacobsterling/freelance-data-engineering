"use client"

import { useEffect, useRef } from "react"

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const pointsRef = useRef<{ x: number; y: number }[]>([])
  const startTimeRef = useRef<number>(0)
  const animationDurationMs = 2000 // 2 seconds animation

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = 350

        // Initialize points for the animated chart
        const chartWidth = 400
        const chartHeight = 200
        const chartX = window.innerWidth - chartWidth - 40
        const chartY = 75
        const padding = 30 // Padding for axes

        // Generate points with a more interesting pattern
        pointsRef.current = Array.from({ length: 50 }, (_, i) => {
          const progress = i / 49
          return {
            x: chartX + padding + (i * (chartWidth - padding)) / 49,
            y: chartY + chartHeight - padding + // Start from bottom
              // Combine multiple curves for interesting movement
              (-60 * Math.sin(progress * Math.PI) + // Basic sine wave
                -20 * Math.sin(progress * Math.PI * 2) + // Higher frequency wave
                -50 * progress + // General upward trend
                -30 * Math.pow(progress, 2) + // Acceleration
                (progress > 0.7 ? -40 * Math.pow((progress - 0.7) * 3, 2) : 0)) // Final upward curve
          }
        })

        const drawAxes = (
          ctx: CanvasRenderingContext2D,
          chartX: number,
          chartY: number,
          chartWidth: number,
          chartHeight: number
        ) => {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
          ctx.lineWidth = 1

          // Y axis
          ctx.beginPath()
          ctx.moveTo(chartX + padding, chartY + padding)
          ctx.lineTo(chartX + padding, chartY + chartHeight)
          ctx.stroke()

          // X axis
          ctx.beginPath()
          ctx.moveTo(chartX + padding, chartY + chartHeight)
          ctx.lineTo(chartX + chartWidth, chartY + chartHeight)
          ctx.stroke()

          // Y axis ticks
          for (let i = 0; i <= 4; i++) {
            const y = chartY + chartHeight - (i * (chartHeight - padding) / 4)
            ctx.beginPath()
            ctx.moveTo(chartX + padding - 5, y)
            ctx.lineTo(chartX + padding, y)
            ctx.stroke()
          }

          // X axis ticks
          for (let i = 0; i <= 4; i++) {
            const x = chartX + padding + (i * (chartWidth - padding) / 4)
            ctx.beginPath()
            ctx.moveTo(x, chartY + chartHeight)
            ctx.lineTo(x, chartY + chartHeight + 5)
            ctx.stroke()
          }
        }

        const animate = (timestamp: number) => {
          if (!startTimeRef.current) startTimeRef.current = timestamp
          const progress = (timestamp - startTimeRef.current) / animationDurationMs

          // Clear the canvas
          ctx.fillStyle = "#0f172a"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw the code
          drawCode(ctx)

          // Animate and draw the chart
          drawChart(ctx, chartX, chartY, chartWidth, chartHeight, progress)

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate)
          } else {
            // Draw one final frame
            drawFinalChart(ctx, chartX, chartY, chartWidth, chartHeight)
          }
        }

        const drawChart = (
          ctx: CanvasRenderingContext2D,
          chartX: number,
          chartY: number,
          chartWidth: number,
          chartHeight: number,
          progress: number
        ) => {
          const points = pointsRef.current
          const visiblePoints = Math.floor(points.length * progress)

          // Create gradient for stroke
          const gradient = ctx.createLinearGradient(chartX, 0, chartX + chartWidth, 0)
          gradient.addColorStop(0, "rgba(147, 51, 234, 0.7)")  // Purple
          gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.7)") // Blue
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.7)")   // Green

          // Create gradient for fill
          const fillGradient = ctx.createLinearGradient(chartX, 0, chartX + chartWidth, 0)
          fillGradient.addColorStop(0, "rgba(147, 51, 234, 0.1)")
          fillGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.1)")
          fillGradient.addColorStop(1, "rgba(16, 185, 129, 0.1)")

          // Draw axes
          drawAxes(ctx, chartX, chartY, chartWidth, chartHeight)

          if (visiblePoints > 1) {
            // Draw the line up to current progress
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)

            // Create smooth curve for visible points
            for (let i = 1; i < visiblePoints - 2; i++) {
              const xc = (points[i].x + points[i + 1].x) / 2
              const yc = (points[i].y + points[i + 1].y) / 2
              ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
            }

            if (visiblePoints > 2) {
              ctx.quadraticCurveTo(
                points[visiblePoints - 2].x,
                points[visiblePoints - 2].y,
                points[visiblePoints - 1].x,
                points[visiblePoints - 1].y
              )
            }

            // Style and stroke the line
            ctx.strokeStyle = gradient
            ctx.lineWidth = 3
            ctx.stroke()

            // Fill area under the curve
            ctx.lineTo(points[visiblePoints - 1].x, chartY + chartHeight)
            ctx.lineTo(points[0].x, chartY + chartHeight)
            ctx.fillStyle = fillGradient
            ctx.fill()

            // Add glow effect
            ctx.shadowColor = "rgba(147, 51, 234, 0.3)"
            ctx.shadowBlur = 15
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        }

        const drawFinalChart = (
          ctx: CanvasRenderingContext2D,
          chartX: number,
          chartY: number,
          chartWidth: number,
          chartHeight: number
        ) => {
          const points = pointsRef.current

          // Create final gradients
          const gradient = ctx.createLinearGradient(chartX, 0, chartX + chartWidth, 0)
          gradient.addColorStop(0, "rgba(147, 51, 234, 0.7)")
          gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.7)")
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.7)")

          const fillGradient = ctx.createLinearGradient(chartX, 0, chartX + chartWidth, 0)
          fillGradient.addColorStop(0, "rgba(147, 51, 234, 0.1)")
          fillGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.1)")
          fillGradient.addColorStop(1, "rgba(16, 185, 129, 0.1)")

          // Draw axes
          drawAxes(ctx, chartX, chartY, chartWidth, chartHeight)

          // Draw the final curve
          ctx.beginPath()
          ctx.moveTo(points[0].x, points[0].y)

          for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2
            const yc = (points[i].y + points[i + 1].y) / 2
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
          }

          ctx.quadraticCurveTo(
            points[points.length - 2].x,
            points[points.length - 2].y,
            points[points.length - 1].x,
            points[points.length - 1].y
          )

          ctx.strokeStyle = gradient
          ctx.lineWidth = 3
          ctx.stroke()

          ctx.lineTo(points[points.length - 1].x, chartY + chartHeight)
          ctx.lineTo(points[0].x, chartY + chartHeight)
          ctx.fillStyle = fillGradient
          ctx.fill()

          // Add final glow
          ctx.shadowColor = "rgba(147, 51, 234, 0.3)"
          ctx.shadowBlur = 15
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        const drawCode = (ctx: CanvasRenderingContext2D) => {
          ctx.font = "14px monospace"

          const code = `
def load_from_sql(query):
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=server;DATABASE=db;UID=user;PWD=pass')
    return read_sql(query, conn)

def process_data(table_name):
    query = f'SELECT * FROM {table_name} WHERE is_active = 1'
    raw_data = load_from_sql(query)
    
    cleaned_data = preprocess(raw_data)
    features = extract_features(cleaned_data)
    model = train_model(features)
    predictions = make_predictions(model, features)
    
    store_results(predictions, table_name)
    return analyze_results(predictions)

def main():
    results = process_data('clients')
    visualize_insights(results)

if __name__ == '__main__':
    main()
          `

          const syntaxColors = {
            keywords: "rgba(153, 204, 255, 0.4)",
            functions: "rgba(144, 238, 144, 0.4)",
            operators: "rgba(255, 153, 153, 0.4)",
            strings: "rgba(255, 235, 153, 0.4)",
            constants: "rgba(220, 198, 224, 0.4)",
            default: "rgba(255, 255, 255, 0.4)"
          }

          const functionNames = [
            'process_data', 'preprocess', 'extract_features',
            'train_model', 'make_predictions', 'analyze_results',
            'main', 'load_from_sql', 'store_results', 'visualize_insights'
          ]

          const lines = code.split("\n")
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            let xPos = 40
            const yPos = 40 + i * 16

            const tokens = line.split(/(\s+|[():]|'[^']*'|==)/).filter(Boolean)

            for (const token of tokens) {
              if (token.match(/^\s+$/)) {
                xPos += ctx.measureText(token).width
                continue
              }

              let color = syntaxColors.default
              if (token === 'def' || token === 'if' || token === 'return') {
                color = syntaxColors.keywords
              } else if (functionNames.includes(token)) {
                color = syntaxColors.functions
              } else if (token.match(/[():]|==/)) {
                color = syntaxColors.operators
              } else if (token.match(/^'.*'$/)) {
                color = syntaxColors.strings
              } else if (token === '__name__' || token === '__main__') {
                color = syntaxColors.constants
              }

              ctx.fillStyle = color
              ctx.fillText(token, xPos, yPos)
              xPos += ctx.measureText(token).width
            }
          }
        }

        // Start the animation
        animate(performance.now())

        // Cleanup
        return () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
          }
        }
      }
    }
  }, [])

  return (
    <section className="relative bg-slate-950 text-white min-h-[350px] overflow-hidden">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="container mx-auto text-center relative z-10 py-20">
        <h1 className="text-4xl font-bold mb-4">Data Engineering Solutions</h1>
        <p className="text-xl mb-8">Tailored, scalable solutions for your data challenges.</p>
        <a
          href="#contact"
          className="bg-white text-slate-900 px-6 py-2 rounded-full font-semibold hover:bg-slate-200 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  )
}

export default Hero

