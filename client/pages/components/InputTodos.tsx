import * as React from "react";
import { useState } from "react";
import { Input, Textarea, Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";

import { ADD_TODO } from "../graphql/mutations";
import { LOAD_TODOS } from "../graphql/queries";

const InputTodos: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [taskTodo, setTaskTodo] = useState<string>("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const [addTodo] = useMutation(ADD_TODO);

  const addUser = () => {
    addTodo({
      variables: {
        task: taskTodo,
      },
      refetchQueries: [{ query: LOAD_TODOS }],
    });
    setTaskTodo("");
  };

  return (
    <Flex position="relative">
      <Textarea
        value={taskTodo}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setTaskTodo(e.target.value)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Write a task"
        h={isFocused ? "230px" : "50px"}
        transition="height 0.3s ease-in-out"
        resize="none"
        focusBorderColor="transparent"
        _focus={{
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px;",
          borderColor: "transparent",
        }}
        borderRadius="50px"
        boxShadow="rgba(0, 0, 0, 0.25) 0px 5px 15px;"
        bg="#FFFFFF"
        padding="25px"
      />

      {taskTodo && (
        <Button
          onClick={addUser}
          colorScheme="blue"
          rounded="full"
          zIndex={1000}
          cursor="pointer"
          position="absolute"
          bottom={0}
          right={0}
          mr={5}
          mb={5}
          w={12}
          h={12}
        >
          <AddIcon />
        </Button>
      )}
    </Flex>
  );
};

export default InputTodos;
