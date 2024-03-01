import {useState} from "react";
import Cookies from "js-cookie";

type UserDataType = {
    firstname: string;
    lastname: string;
    mail: string;
};

const getUserData = () => {
    console.log(sessionStorage.getItem("userData"));
    const userDataString = sessionStorage.getItem("userData");
    if (userDataString) {
        return JSON.parse(userDataString) as UserDataType;
    }
    const userDataEmpty: UserDataType = {} as UserDataType;
    return userDataEmpty;
};
const updateUser = async (e) => {
    e.preventDefault();
     const DataUpdated= new FormData(e.currentTarget);
     const userData = {
        firstname: DataUpdated.get("firstname") as string,
        lastname: DataUpdated.get("lastname") as string,
        mail: DataUpdated.get("mail") as string,
         token: Cookies.get("token"),
     }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error updating user", error);
            });
    }catch (error) {
        console.error("Error updating user", error);
    }
};


const FormularyAccountClient = () => {
    const showModale = (e) => {
        e.preventDefault();
        setModaleVisible(true);
    }
    const closeModale = (e) => {
        e.preventDefault();
        setModaleVisible(false);
    }
    const [modaleVisible, setModaleVisible] = useState(false);
    const [userData, setUserData] = useState<UserDataType | null>(getUserData());
    return (
        <div className="w-full">
            <form className={`flex-column w-1/2 m-auto ${modaleVisible ? 'blur-md' : ''}`}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-2xl text-primary">Nom</span>
                    </div>
                    <input type="text" placeholder="Nom de l'utilisateur"
                           className="input input-bordered input-primary w-full " defaultValue={userData?.firstname}/>
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-2xl text-primary">Prénom</span>
                    </div>
                    <input type="text" placeholder="Prénom de l'utilisateur "
                           className="input input-bordered input-primary w-full " defaultValue={userData?.lastname}/>
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-2xl text-primary">Mail</span>
                    </div>
                    <input type="text" placeholder="Mail de l'utilisateur "
                           className="input input-bordered input-primary w-full " defaultValue={userData?.mail}/>
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-2xl text-primary">Nouveaux mot de passe:</span>
                    </div>
                    <input type="password" placeholder="mot de passe "
                           className="input input-bordered input-primary w-full  "/>
                </label>
                <div className="flex gap-5 justify-end m-5">
                    <button className="btn btn-primary">Modifier mes données</button>
                    <button className="btn btn-accent" onClick={e => showModale(e)}>Supprimer mon compte
                    </button>

                </div>
            </form>
            <div
                className={`deleteModale fixed  right-1/2 left-1/2 top-1/2 w-1/2 h-1/2 z-50  -translate-y-1/2 ${modaleVisible ? '' : 'hidden'}`}>
                <div className="modal-box flex-col gap-3 w-full h-full justify-between">
                    <h3 className="font-bold text-lg m-20">Voulez-vous vraiment supprimer votre compte ? </h3>
                    <p className="text-primary m-10 text-center text-2xl text-accent">Cette action est irrémédiable </p>
                    <div className="flex gap-3 justify-around  w-full">

                        <button className="btn btn-primary " onClick={e => closeModale(e)}>Annuler</button>
                        <button className="btn btn-accent ">Supprimer mon compte</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormularyAccountClient;