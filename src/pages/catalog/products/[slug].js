import { useRouter } from 'next/router';
import { client } from '../../../lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';


export default function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
   <div>
      <h1>
        {PrismicDom.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="300" alt=""/>

      <div dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(product.data.description)}}>
      </div>

      <p>Price: ${product.data.price}</p>
   </div>
  );
   
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async(context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', slug, {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}