import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface getImagesResponse {
  after: string;
  data: {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
  };
}

export default function Home(): JSX.Element {
  const getImages = ({ pageParam = null }): getImagesResponse => {
    const data = api
      .get('/api/images', { params: { after: pageParam } })
      .then(response => response.data)
      .catch(err => null);
    return data as any;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['images'],
    queryFn: getImages,
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    if (data) {
      return data.pages.flatMap(page => page.data);
    }

    return [];
  }, [data]);

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {formattedData && <CardList cards={formattedData} />}
        {hasNextPage && (
          <Box mt={10}>
            <Button onClick={() => fetchNextPage()}>Carregar mais</Button>
          </Box>
        )}

        {(isLoading || isFetchingNextPage) && <Loading />}
        {(isError || !!formattedData) && <Error />}
      </Box>
    </>
  );
}
