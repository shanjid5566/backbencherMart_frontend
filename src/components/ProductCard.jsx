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
  const fullStars = Math.floor(rating);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${featured ? "ring-2 ring-red-300" : ""}`}
    >
      <div className="relative w-full aspect-square bg-[#F0EEED] dark:bg-[#374151] flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover h-full w-full rounded-sm"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-[18px] h-[18px] ${i < fullStars ? "text-[#FFC633]" : "text-gray-300 dark:text-gray-600"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-900 dark:text-white">
            {rating}
            <span className="text-gray-400 dark:text-gray-500">/5</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          {oldPrice && (
            <>
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500 line-through">
                ${oldPrice}
              </span>
              {discount && (
                <span className="text-xs bg-[#FF33331A] text-[#FF3333] px-3 py-1 rounded-full font-medium">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
