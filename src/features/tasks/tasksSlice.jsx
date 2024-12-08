import { apiSlice } from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    //add
    addTasks: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      // task is basically the object you are sending to server
      // exmple : {title:"Hello",status: "todo"}
      // but currently it doesn't have any _id
      // so we are manually adding an id for optimistic update
      // draft is == previous todo list

      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            //see the task on top
            draft.unshift({
              _id: crypto.randomUUID(),
              ...task,
            });
          })
        );
        //if query isn't full filled then undo
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    //delete
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            // const itemIndx = draft.findIndex((item) => item._id == id);
            // draft.splice(itemIndx, 1);

            return draft.filter((task) => task._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    //update status
    updateStatus: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: updatedTask,
      }),
      async onQueryStarted(
        { id, ...updatedTask },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const itemIndx = draft.findIndex((item) => item._id == id);
            draft[itemIndx] = { ...draft[itemIndx], ...updatedTask };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTasksMutation,
  useDeleteTaskMutation,
  useUpdateStatusMutation,
} = tasksApi;
