const Services = () => {
  const services = [
    {
      title: "Data Pipeline Development",
      description: "Design and implement efficient data pipelines for seamless data flow.",
    },
    {
      title: "ETL Process Optimization",
      description: "Optimize your Extract, Transform, Load processes for improved performance.",
    },
    { title: "Big Data Solutions", description: "Harness the power of big data with our scalable solutions." },
    {
      title: "Data Warehouse Design",
      description: "Create robust data warehouses for effective data storage and retrieval.",
    },
  ]

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

