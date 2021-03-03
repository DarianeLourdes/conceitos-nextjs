import { useEffect, useState } from 'react'
import { Title } from '../styles/pages/Home';

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      })
    });
  }, []);

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
