import { TodoModel } from "@/lib/models";
import { EditForm } from "@/components";
import styles from "./page.module.scss";

const getTodo = async ({ todoId }: { todoId: string }) => {
  try {
    const todo = await TodoModel.findById(todoId);
    return todo;
  } catch (error: any) {
    return null;
  }
};

const EditPage = async ({ params }: { params: { todoId: string } }) => {
  const { todoId } = params;

  const todo = await getTodo({ todoId });

  return (
    <div className={styles["todo-item-wrapper"]}>
      <EditForm
        id={todo._id.toString()}
        title={todo.title}
        isDone={todo.isDone}
      />
    </div>
  );
};

export default EditPage;
