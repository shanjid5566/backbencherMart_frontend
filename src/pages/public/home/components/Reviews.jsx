import React, { useState, useEffect, useRef } from 'react'
import Container from '../../../../components/Container'

const reviews = [
  { id: 'r1', name: 'Sarah M.', rating: 5, text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, once I've bought has exceeded my expectations." },
  { id: 'r2', name: 'Alex K.', rating: 5, text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.' },
  { id: 'r3', name: 'James L.', rating: 5, text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends." },
  { id: 'r4', name: 'Moo R.', rating: 5, text: 'Beautiful pieces and fast shipping — highly recommended!' },
  { id: 'r5', name: 'Nina P.', rating: 4, text: 'Great quality, sizing runs a little small so order one size up.' },
  { id: 'r6', name: 'Omar S.', rating: 5, text: 'Customer support was very helpful with my exchange.' },
]

function Stars({ value = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < value ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(3)
  const trackRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setVisible(1)
      else if (w < 1024) setVisible(2)
      else setVisible(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, reviews.length - visible)

  const prev = () => setIndex((i) => (i - 1 < 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i + 1 > maxIndex ? 0 : i + 1))

  const percent = (index * 100) / visible

  return (
    <section className="w-full pt-12 pb-6 lg:py-16">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">Our Happy Customars</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-400"
              style={{ transform: `translateX(-${percent}%)` }}
            >
              {reviews.map((r) => (
                <div key={r.id} className="flex-shrink-0" style={{ width: `${100 / visible}%` }}>
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm mx-2 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">{r.name.split(' ')[0][0]}</div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{r.name}</div>
                          <div className="text-xs text-gray-400">Verified Buyer</div>
                        </div>
                      </div>
                      <div>
                        <Stars value={r.rating} />
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              aria-label="Previous reviews"
              onClick={prev}
              className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-200 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.879a1 1 0 111.515-1.29l5 5.882a1 1 0 010 1.29l-5 5.882a1 1 0 01-1.515 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              aria-label="Next reviews"
              onClick={next}
              className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.879a1 1 0 111.515-1.29l5 5.882a1 1 0 010 1.29l-5 5.882a1 1 0 01-1.515 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
