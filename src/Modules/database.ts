import {auth, db} from "./firebase";
import {onAuthStateChanged} from "firebase/auth";
import {collection, doc, updateDoc} from "firebase/firestore";
import {openModal} from "../Redux/modalSlice";
import {ProjectInterface, ToDoInterface} from "./d";

const database = (() => {
    const updateDatabase = (toDosCopy: ToDoInterface[] | ProjectInterface[], type: string) => {
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
                localStorage.setItem(itemName, (JSON.stringify(toDosCopy)));
            }
        });
    }

    return { updateDatabase };
})();

export default database;