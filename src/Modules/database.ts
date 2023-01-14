import {auth, db} from "./firebase";
import {onAuthStateChanged} from "firebase/auth";
import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {ProjectInterface, ToDoInterface} from "./d";

// Module for handling database operations
const database = (() => {

    // Function for updating database records
    const updateDatabase = (toDosCopy: ToDoInterface[] | ProjectInterface[], type: string) => {
        onAuthStateChanged(auth, async (user) => {
            
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        [type]: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                    console.log(e);
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
                localStorage.setItem(itemName, (JSON.stringify(toDosCopy)));
            }
        });
    }

    // Function for retrieving database records on app startup
    const loadDatabase = () => {
        
        let rawToDoAry: ToDoInterface[] = [];
        let rawDoneToDoAry: ToDoInterface[] = [];
        let rawProjectAry: ProjectInterface[] = [];
        let rawDoneProjectAry: ProjectInterface[] = [];
        onAuthStateChanged(auth,  async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                rawToDoAry = JSON.parse(docSnap.data()?.todos || "[]");
                rawDoneToDoAry = JSON.parse(docSnap.data()?.donetodos || "[]");
                rawProjectAry = JSON.parse(docSnap.data()?.projects || "[]");
                rawDoneProjectAry = JSON.parse(docSnap.data()?.doneprojects || "[]");
                return {todos: rawToDoAry, donetodos: rawDoneToDoAry, projects: rawProjectAry, doneprojects: rawDoneProjectAry, one: 1}
            } else {
                
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                rawDoneToDoAry = JSON.parse(localStorage.getItem("donetodoary") || "[]");
                rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]");
                rawDoneProjectAry = JSON.parse(localStorage.getItem("doneprojectary") || "[]");
            }

        });
    }

    return { updateDatabase, loadDatabase };
})();

export default database;