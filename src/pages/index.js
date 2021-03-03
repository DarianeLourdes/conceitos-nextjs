import { Title } from '../styles/pages/Home';

export default function Home({ recommendedProducts }) {

  return (
   <div>
     <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            );
          })}
        </ul>
     </section>
   </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/recommended')
  const recommendedProducts = await response.json();
    
  return {
    props: {
      recommendedProducts
    }
  }
}