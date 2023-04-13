import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
  List,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { LOAD_TODOS } from "../graphql/queries";
import { REMOVE_TODO, UPDATE_TODO } from "../graphql/mutations";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

const Todos = (): JSX.Element => {
  const { loading, data } = useQuery<{ todos: Todo[] }>(LOAD_TODOS);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [removeTodo] = useMutation(REMOVE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
    }
  }, [data]);

  return (
    <List h="600px" w="100%" overflowY="auto">
      {!loading &&
        todos.map((todo) => (
          <Box
            borderRadius="lg"
            p="4"
            bg="#FFFFFF"
            key={todo.id}
            mt={5}
            mr={2}
            ml={2}
            boxShadow="rgba(0, 0, 0, 0.20) 0px 5px 15px;"
          >
            <Flex align="center">
              <Checkbox
                isChecked={todo.completed}
                onChange={() =>
                  updateTodo({
                    variables: { id: todo.id },
                    refetchQueries: [{ query: LOAD_TODOS }],
                  })
                }
                mr={2}
                bg="#bbe4fb"
                size="lg"
                border="none"
                borderRadius="xl"
                colorScheme="#bbe4fb"
                iconColor="black"
              />
              <Text>{todo.task}</Text>
              <Spacer />
              <IconButton
                aria-label="Delete Todo"
                bg="transparent"
                icon={<DeleteIcon color="red.500" />}
                onClick={() =>
                  removeTodo({
                    variables: { id: todo.id },
                    refetchQueries: [{ query: LOAD_TODOS }],
                  })
                }
              />
            </Flex>
          </Box>
        ))}
    </List>
  );
};

export default Todos;
