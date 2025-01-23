"use client"

import { useEffect, useRef } from "react"

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = 400

        const code = `
def process_data(data):
    cleaned_data = preprocess(data)
    features = extract_features(cleaned_data)
    model = train_model(features)
    predictions = make_predictions(model, features)
    return analyze_results(predictions)

def main():
    raw_data = load_data('big_data.csv')
    results = process_data(raw_data)
    visualize_insights(results)

if __name__ == '__main__':
    main()
        `

        ctx.font = "14px monospace"
        ctx.fillStyle = "rgba(203, 213, 225, 0.1)" // Light slate color with low opacity

        const lines = code.split("\n")
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], 10, 20 + i * 20)
        }
      }
    }
  }, [])

  return (
    <section className="relative bg-slate-950 text-white py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4">Expert Data Engineering Solutions</h1>
        <p className="text-xl mb-8">Transforming your data into actionable insights</p>
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

