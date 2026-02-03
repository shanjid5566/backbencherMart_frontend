import React from 'react'
import Container from '../../../../components/Container'

const styles = [
  {
    id: 'casual',
    title: 'Casual',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'formal',
    title: 'Formal',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'party',
    title: 'Party',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'gym',
    title: 'Gym',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80',
  },
]

export default function BrowseByStyle() {
  return (
    <section className="w-full pt-12 pb-6 lg:pt-16 lg:pb-8">
      <Container>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">BROWSE BY DRESS STYLE</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {styles.map((s, idx) => (
              <div
                key={s.id}
                className={`relative overflow-hidden rounded-xl h-40 sm:h-44 md:h-52 lg:h-56 bg-white`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-95"
                />

                <div className="absolute inset-0 bg-white/40 dark:bg-black/20" />

                <div className="absolute top-4 left-4">
                  <span className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{s.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
