import React from "react";

function hello(packageName: string) {
  return 'hello ' + packageName;
}

const Component = () => {
  return <div>Hello component</div>;
};

export default hello;
export { Component };
