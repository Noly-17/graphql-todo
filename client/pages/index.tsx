import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { onError } from "@apollo/client/link/error";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import Todos from "./components/Todos";
import InputTodos from "./components/InputTodos";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
const inter = Inter({ subsets: ["latin"] });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
});
const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:5000/graphql",
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default function Home() {
  return (
    <>
      <ApolloProvider client={client}>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          h="95vh"
          style={{ margin: "20px" }}
        >
          <div style={{ marginTop: "50px" }}>
            <Text fontSize="2xl" as="b">
              TODO
            </Text>
            <Todos />
          </div>
          <Spacer />
          <InputTodos />
        </Flex>
      </ApolloProvider>
    </>
  );
}
