import Link from 'next/link';
import { useRouter } from 'next/router';
import { client } from '../../../lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';

export default function Category({ category, products }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
        <h1>
        {PrismicDom.RichText.asText(category.data.title)}
        </h1>

        <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(product.data.title)}
                  </a>
                </Link>
              </li>
          );
        })}
      </ul>
    </div>
  );
   
}


export const getStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid }
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async(context) => {
  const { slug } = context.params;

  const category = await client().getByUID('category', slug);

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id)
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  }
}