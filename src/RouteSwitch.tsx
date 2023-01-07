import React from "react";
import {BrowserRouter, Routes, Route, useNavigate, To} from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Done from "./Done";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import {useEffect} from "react";
import toDoManipulator from "./todomanipulator"
import {ProjectInterface, ToDoInterface} from "./d";

export default function RouteSwitch() {
    const [formVisible, setFormVisible] = React.useState(false);
    const [contentClass, setContentClass] = React.useState("");
    const [toDos, setToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);
    const [doneToDos, setDoneToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);
    const [projects, setProjects] = React.useState<ProjectInterface[]>([] as ProjectInterface[]);


    let homeCounter = 0;

    useEffect(() => {
        console.log("RouteSwitch rendered");
        toDoManipulator.loadArys();
        setToDos(toDoManipulator.getToDoAry());
        setDoneToDos(toDoManipulator.getDoneAry());
        setProjects(toDoManipulator.getProjectAry());
    }, []);

    const openToDoForm = () => {
        setFormVisible(true);
        setContentClass("blurred");
    }
    const closeToDoForm = () => {
        setFormVisible(false);
        setContentClass("");
    }
    const modifyToDo = (iD: number, heading: string, text: string, date: Date, priority: string) => {
        toDoManipulator.modifyToDo(iD, heading, text, date, priority);
        setToDos(toDoManipulator.getToDoAry());
    }
  return (
      <div id={"content"} className={contentClass}>
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home key={0}
                      formVisible={formVisible} newToDo={openToDoForm} modifyToDo={modifyToDo}
                      closeToDo={closeToDoForm} toDos={toDos}/>} />
                  <Route path="/home" element={<Home key={0}
                      formVisible={formVisible} newToDo={openToDoForm} modifyToDo={modifyToDo}
                      closeToDo={closeToDoForm} toDos={toDos}/>} />
                  <Route path="/done" element={<Done
                      formVisible={formVisible} newToDo={openToDoForm} closeToDo={closeToDoForm}/>} />
                  <Route path="/projects" element={<Projects
                      projects={projects} newToDo={openToDoForm}
                      closeToDo={closeToDoForm} formVisible={formVisible} setContentClass={setContentClass}/>} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path="*" element={<NoMatch />} />
              </Routes>
            </BrowserRouter>
      </div>
  );
}