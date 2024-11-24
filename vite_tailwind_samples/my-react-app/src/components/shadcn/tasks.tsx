/*
DataTableColumnHeader, DataTablePagination, DataTableViewOptions が便利コンポらしい。
DataTableColumnHeader:
  ソートとColumn Visibility の対応がしてあるコンポーネント
DataTablePagination:
  paginationのコンポーネント
DataTableViewOptions: 
  Column Visibilityを選択するためのコンポーネント
*/

// import { promises as fs } from "fs";
// import path from "path";
// import { Metadata } from "next";
// import Image from "next/image";
// import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
// import { taskSchema } from "./data/schema";

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// };

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "app/(app)/examples/tasks/data/tasks.json"),
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

export const TaskPage = () => {
  // const tasks = await getTasks();
  // dummy
  const tasks = [
    {
      id: "1",
      title: "Task 1",
      status: "in progress",
      label: "bug",
      priority: "high",
    },
    {
      id: "2",
      title: "Task 2",
      status: "todo",
      label: "feature",
      priority: "medium",
    },
  ];

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div> */}
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
};
