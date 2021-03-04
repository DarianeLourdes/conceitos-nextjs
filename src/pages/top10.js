export default function Top10({ products }) {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        {products.map(recommendedProduct => {
          return (
            <li key={recommendedProduct.id}>
              {recommendedProduct.title}
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export const getStaticProps = async() => {
  const response = await fetch('http://localhost:3333/products')
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}