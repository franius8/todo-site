import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Done from "./Done";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import Account from "./Account";
import ForgotPassword from "./ForgotPassword";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import todoObject from "./Modules/todoObject";
import projectobject from "./Modules/projectobject";

export default function RouteSwitch() {
    const [toDos, setToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);


    const convertRawToDos = (rawToDoAry: any[]) => {
        const toDoAry: ToDoInterface[] = [];
        rawToDoAry.forEach((todo: ToDoInterface) => {
            toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
        });
        return toDoAry;
    }

    const convertRawProjects = (rawProjectAry: any[]) => {
        const projectAry: ProjectInterface[] = [];
        rawProjectAry.forEach((project: ProjectInterface) => {
            project.toDosAry = convertRawToDos(project.toDosAry);
            projectAry.push(projectobject(project.iD, project.name, project.toDosAry, project.date, project.priority));
        });
        return projectAry;
    }

  return (
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home key={0} />} />
                  <Route path="/home" element={<Home key={0} />} />
                  <Route path="/done" element={<Done />} />
                  <Route path="/projects" element={<Projects toDos={toDos} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<NoMatch />} />
              </Routes>
            </BrowserRouter>
  );
}