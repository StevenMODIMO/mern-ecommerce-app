export default function Rates({ rates }) {
  const data = rates;
  const validRatings = data.filter(
    (obj) => typeof obj.rate === "number" && !isNaN(obj.rate)
  );
  const totalRatings = validRatings.length;
  const sumRatings = validRatings.reduce(
    (accumulator, obj) => accumulator + obj.rate,
    0
  );
  const averageRate = totalRatings > 0 ? sumRatings / 5 : 0;

  return (
    <div>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= averageRate >= 1 ? "text-yellow-500" : "text-black"
              }
            >
              <span>&#9733;</span>
              
            </button>
          );
        })}
        <span>{Number(averageRate.toFixed(1))}</span>
      </div>
    </div>
  );
}
