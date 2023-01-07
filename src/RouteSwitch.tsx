import React from "react";
import {BrowserRouter, Routes, Route, useNavigate, To} from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Done from "./Done";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import Account from "./Account";
import {useEffect} from "react";
import toDoManipulator from "./todomanipulator"
import {ProjectInterface, ToDoInterface} from "./d";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase";
import {collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import dateFixer from "./datefixer";
import todoObject from "./todoObject";
import idGenerator from "./idGenerator";

export default function RouteSwitch() {
    const [formVisible, setFormVisible] = React.useState(false);
    const [contentClass, setContentClass] = React.useState("");
    const [toDos, setToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);
    const [doneToDos, setDoneToDos] = React.useState<ToDoInterface[]>([] as ToDoInterface[]);
    const [projects, setProjects] = React.useState<ProjectInterface[]>([] as ProjectInterface[]);

    useEffect(() => {
        let rawToDoAry: any[] = [];
        let unsubscribe = () => {};
        onAuthStateChanged(auth,  async (user) => {
            if (user) {
                unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    setToDos(convertRawToDos(rawToDoAry));
                });
            } else {
                console.log("No user is currently signed in. ToDos are saved in local storage.");
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                setToDos(convertRawToDos(rawToDoAry));
            }
        });
        return () => unsubscribe();
    }, []);

    const convertRawToDos = (rawToDoAry: any[]) => {
        const toDoAry: ToDoInterface[] = [];
        rawToDoAry.forEach((todo: ToDoInterface) => {
            todo.date = dateFixer.fixDates(todo.date);
            toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
        });
        return toDoAry;
    }

    const openToDoForm = () => {
        setFormVisible(true);
        setContentClass("blurred");
    }
    const closeToDoForm = () => {
        setFormVisible(false);
        setContentClass("");
    }
    const updateDatabase = async (toDosCopy: ToDoInterface[]) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        todos: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                }
            } else {
                alert("No user is currently signed in. ToDos are saved in local storage.");
                localStorage.setItem('todoary', (JSON.stringify(toDosCopy)));
            }
        });
    }
    const createToDo = (heading: string, text: string, date: Date, priority: string) => {
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        setToDos(toDosCopy);
        updateDatabase(toDosCopy);
    }
    const modifyToDo = (iD: number, heading: string, text: string, date: Date, priority: string) => {
        let toDosCopy = [...toDos];
        toDosCopy = toDosCopy.filter(x => x.iD !== iD)
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        setToDos(toDosCopy);
        updateDatabase(toDosCopy);
    }
    const deleteToDo = (iD: number) => {
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
            const toDosCopy = [...toDos].filter(x => x.iD !== iD);
            idGenerator.freeID(iD);
            updateDatabase(toDosCopy);
            setToDos(toDosCopy);
        }
    }
  return (
      <div id={"content"} className={contentClass}>
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home key={0}
                      formVisible={formVisible} newToDo={openToDoForm} modifyToDo={modifyToDo} deleteToDo={deleteToDo}
                      closeToDo={closeToDoForm} toDos={toDos} createToDo={createToDo}/>} />
                  <Route path="/home" element={<Home key={0}
                      formVisible={formVisible} newToDo={openToDoForm} modifyToDo={modifyToDo} deleteToDo={deleteToDo}
                      closeToDo={closeToDoForm} toDos={toDos} createToDo={createToDo}/>} />
                  {/*
                  <Route path="/done" element={<Done createToDo={createToDo}
                      formVisible={formVisible} newToDo={openToDoForm} closeToDo={closeToDoForm}/>} />
                  <Route path="/projects" element={<Projects createToDo={createToDo}
                      projects={projects} newToDo={openToDoForm}
                      closeToDo={closeToDoForm} formVisible={formVisible} setContentClass={setContentClass}/>} />
                      */}
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/account"} element={<Account />} />
                  <Route path="*" element={<NoMatch />} />
              </Routes>
            </BrowserRouter>
      </div>
  );
}