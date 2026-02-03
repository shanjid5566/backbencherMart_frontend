export default function ProductCard({
  image,
  title,
  rating = 4.5,
  price,
  oldPrice,
  discount,
  featured = false,
  onClick,
}) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={`s-${i}`} className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.561-.955L10 1.5l2.95 5.456 6.56.955-4.755 3.635 1.123 6.545z" />
      </svg>
    );
  }
  if (halfStar) {
    stars.push(
      <svg key="s-half" className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 20 20" aria-hidden>
        <path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.561-.955L10 1.5l2.95 5.456 6.56.955-4.755 3.635 1.123 6.545z" fill="currentColor" style={{opacity:0.75}} />
      </svg>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg ${featured ? 'ring-2 ring-red-300' : ''} bg-transparent text-gray-900 w-56`}
    >
      <div className="relative p-4 flex justify-center items-center">
        {discount ? (
          <span className="absolute top-3 right-3 bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded-full shadow-sm">-{discount}</span>
        ) : null}

        <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          <img src={image} alt={title} className="max-w-4/5 max-h-4/5 object-contain" />
        </div>
      </div>

      <div className="px-3 pb-3">
        <h3 className="text-sm font-semibold mb-2">{title}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">{stars}</div>
          <div className="text-xs text-gray-500">{rating}/5</div>
        </div>

        <div className="flex items-baseline gap-3">
          <div className="text-lg font-bold">${price}</div>
          {oldPrice ? <div className="text-sm text-gray-400 line-through">${oldPrice}</div> : null}
        </div>
      </div>
    </div>
  );
}
