import React from "react";

import TodoList from "./TodoList";

function Test() {
  return (
    <div class="container m-auto p-8 text-grey-darkest">
      <div class="flex flex-wrap  mb-8">
        <div class="w-full lg:w-2/3 ">
          <TodoList />
        </div>
        <div class="w-full lg:w-1/3 ">
          <div class="border h-12 text-sm text-grey-dark flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}

export default Test;
