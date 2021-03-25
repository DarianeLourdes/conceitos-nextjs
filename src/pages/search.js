import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { client } from '../lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';


export default function Search({ searchResults }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    e.preventDefault();

    router.push(
      `/search?q=${encodeURIComponent(search)}`
    )

    setSearch('');
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {searchResults.map(product => {
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
  )
}

export const getServerSideProps = async (context) => {
  const { q } = context.query;

  if (!q) {
    return { props: { searchResults: [] } };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', q)
  ])

  return {
    props: {
      searchResults: searchResults.results,
    }
  }
}