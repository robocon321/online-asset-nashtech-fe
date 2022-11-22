import axios from "axios";

export const ACTIONS = {
  SET_USER_INPUT: "set_todo_input",
  ADD_USER: "add_todo",
};

export const setUserInput = (payload) => ({
  type: ACTIONS.SET_USER_INPUT,
  payload,
});

export const addUser = (payload) => ({ type: ACTIONS.ADD_USER, payload });
