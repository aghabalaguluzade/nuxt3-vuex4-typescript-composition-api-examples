export interface TodoType {
  id: number,
  text: string,
  completed: boolean
}

export type TodoState = {
  loading: boolean,
  todos: TodoType[]
}

// type TodoType = {
//   id: number;
//   text: string;
//   completed: boolean;
// };

// type TodoState = {
//   loading: boolean;
//   todos: TodoType[];
// };