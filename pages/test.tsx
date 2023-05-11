import { Loader, Flex, SimpleGrid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from 'react';
import useSWR from 'swr';

const Test = () => {
  //   const [posts, setPosts] = React.useState<any>(null);
  const [count, setCount] = React.useState<number>(0);

  //   console.log(posts);
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  const swrOptions = {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  };
  const {
    data: posts = [],
    error,
    isLoading,
    isValidating,
  } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher, swrOptions);
  console.log(posts);
  console.log(isValidating);

  if (error) {
    notifications.show({
      title: 'An Error Occured',
      message: 'error',
      color: 'red',
      withCloseButton: true,
    });
  }

  React.useEffect(() => {
    // async function fetchPosts() {
    //   try {
    //     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    //     const data = await response.json();
    //     setPosts(data);
    //   } catch (e) {
    //     notifications.show({
    //       title: 'An Error Occured',
    //       message: 'error',
    //       color: 'red',
    //       withCloseButton: true,
    //     });
    //   }
    // }
    // fetchPosts();
  }, []);
  return (
    <Flex align="center" justify="center" direction="column" gap={2}>
      <Text>Hello, rendering text {count} times</Text>
      <Button
        onClick={() =>
          setCount((prev) => {
            return prev + 1;
          })
        }
      >
        Click me
      </Button>
      <Flex direction="column" gap={12} sx={{ alignSelf: 'center' }}>
        <Text>Sample Card</Text>
        <Card shadow="sm" padding="lg" radius="md" withBorder w={{ base: '90%', md: '50%' }}>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
      </Flex>
      {/* <Flex direction="column" gap={4} align="center" justify="center" wrap="wrap"> */}
      <SimpleGrid
        p={20}
        cols={1}
        spacing={20}
        breakpoints={[{ cols: 4 }, { cols: 3 }, { cols: 2 }]}
      >
        {!posts && isLoading ? (
          <Loader />
        ) : (
          // eslint-disable-next-line array-callback-return
          posts.slice(0, 10).map((post: any) => (
            <Card
              key={post.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              sx={{ flexBasis: '25%' }}
            >
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{post.title}</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                {post.body}
              </Text>

              <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
              </Button>
            </Card>
          ))
        )}
        {/* </Flex> */}
      </SimpleGrid>
    </Flex>
  );
};

export default Test;
