import React from "react";
import {BrowserRouter, Routes, Route, useNavigate, To} from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Done from "./Done";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import Account from "./Account";
import ForgotPassword from "./ForgotPassword";
import {useEffect} from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./Modules/firebase";
import {collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import todoObject from "./Modules/todoObject";
import idGenerator from "./Modules/idGenerator";
import projectobject from "./Modules/projectobject";

export default function RouteSwitch() {
    const [formVisible, setFormVisible] = React.useState(false);
    const [contentClass, setContentClass] = React.useState("");
    const [toDos, setToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);
    const [doneToDos, setDoneToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);
    const [projects, setProjects] = React.useState<ProjectInterface[]>([] as ProjectInterface[]);

    useEffect(() => {
        let rawToDoAry: string[] = [];
        let rawDoneToDoAry: string[] = [];
        let rawProjectAry: string[] = [];
        let unsubscribe = () => {};
        onAuthStateChanged(auth,  async (user) => {
            if (user) {
                unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    setToDos(convertRawToDos(rawToDoAry));
                    rawDoneToDoAry = JSON.parse(doc.data()?.donetodos || "[]");
                    setDoneToDos(convertRawToDos(rawDoneToDoAry));
                    rawProjectAry = JSON.parse(doc.data()?.projects || "[]");
                    setProjects(convertRawProjects(rawProjectAry));
                });
            } else {
                console.log("No user is currently signed in. ToDos are saved in local storage.");
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                console.log(rawToDoAry);
                console.log(convertRawToDos(rawToDoAry));
                setToDos(convertRawToDos(rawToDoAry));
                rawDoneToDoAry = JSON.parse(localStorage.getItem("doneary") || "[]");
                setDoneToDos(convertRawToDos(rawDoneToDoAry));
                rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]")
                setProjects(convertRawProjects(rawProjectAry));
            }
        });
        return () => unsubscribe();
    }, []);

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

    const openToDoForm = () => {
        setFormVisible(true);
        setContentClass("blurred");
    }
    const closeToDoForm = () => {
        setFormVisible(false);
        setContentClass("");
    }
    const updateDatabase = async (toDosCopy: ToDoInterface[] | ProjectInterface[], type: string) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        [type]: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                }
            } else {
                let itemName;
                switch (type) {
                    case "todos":
                        itemName = "todoary";
                        break;
                    case "donetodos":
                        itemName = "donetodoary";
                        break;
                    case "projects":
                        itemName = "projectary";
                        break;
                    default:
                        itemName = "todoary";
                }
                alert("No user is currently signed in. ToDos are saved in local storage.");
                localStorage.setItem(itemName, (JSON.stringify(toDosCopy)));
            }
        });
    }
    const createToDo = (heading: string, text: string, date: string, priority: string) => {
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        setToDos(toDosCopy);
        updateDatabase(toDosCopy, "todos");
    }
    const modifyToDo = (iD: number, heading: string, text: string, date: string, priority: string) => {
        let toDosCopy = [...toDos];
        toDosCopy = toDosCopy.filter(x => x.iD !== iD)
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        setToDos(toDosCopy);
        updateDatabase(toDosCopy, "todos");
    }
    const deleteToDo = (iD: number) => {
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
            const toDosCopy = [...toDos].filter(x => x.iD !== iD);
            idGenerator.freeID(iD);
            updateDatabase(toDosCopy, "todos");
            setToDos(toDosCopy);
        }
    }
    const createProject = (name: string, date: string, priority: string) => {
        const projectsCopy = [...projects];
        const iD = idGenerator.generateID();
        projectsCopy.push(projectobject(iD, name, [], date, priority));
        updateDatabase(projectsCopy, "projects");
        setProjects(projectsCopy);
    }
  return (
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home key={0}
                      formVisible={formVisible} newToDo={openToDoForm} modifyToDo={modifyToDo} deleteToDo={deleteToDo}
                      closeToDo={closeToDoForm} toDos={toDos} createToDo={createToDo}/>} />
                  <Route path="/home" element={<Home key={0}
                      formVisible={formVisible} newToDo={openToDoForm} modifyToDo={modifyToDo} deleteToDo={deleteToDo}
                      closeToDo={closeToDoForm} toDos={toDos} createToDo={createToDo}/>} />
                  <Route path="/done" element={<Done createToDo={createToDo}
                      formVisible={formVisible} newToDo={openToDoForm} closeToDo={closeToDoForm}/>} />
                  <Route path="/projects" element={<Projects createToDo={createToDo} toDos={toDos}
                      projects={projects} newToDo={openToDoForm} createProject={createProject}
                      closeToDo={closeToDoForm} formVisible={formVisible} setContentClass={setContentClass}/>} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/account"} element={<Account />} />
                  <Route path={"/forgot-password"} element={<ForgotPassword />} />
                  <Route path="*" element={<NoMatch />} />
              </Routes>
            </BrowserRouter>
  );
}