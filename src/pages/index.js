import Link from 'next/link';
import { Title } from '../styles/pages/Home';
import SEO from '../components/SEO';
import { client } from '../lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';

export default function Home({ recommendedProducts }) {


  return (
   <div>
     <SEO 
        title="DevCommerce, your best e-commerce!" 
        image="boost.png"
        shouldExcludeTitleSuffix />

     <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
     </section>
   </div>
  )
}

export const getServerSideProps = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

    
  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}