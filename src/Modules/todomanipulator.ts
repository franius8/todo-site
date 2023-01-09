import dateFixer from "./datefixer";
import projectobject from "./projectobject";
import todoObject from "./todoObject";
import idGenerator from "./idGenerator";
import { ToDoInterface, ProjectInterface, RawProject } from "./d";
import { useSelector, useDispatch } from "react-redux";
import {addToDo} from "../Redux/contentSlice";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase";
import {collection, doc, updateDoc} from "firebase/firestore";

const toDoManipulator = (() => {

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

    const createToDo = (heading: string, text: string, date: Date, priority: string) => {
        const toDosCopy = [...toDoList];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        dispatch(addToDo(newToDo));
        updateDatabase(toDosCopy, "todos");
    }



    return {
        createToDo
    }
})();

export default toDoManipulator;