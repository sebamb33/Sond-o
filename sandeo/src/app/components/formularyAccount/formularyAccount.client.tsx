import { useState } from "react";
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
const updateUser = async (e: any) => {
  e.preventDefault();
  const DataUpdated = new FormData(e.currentTarget);
  const userData = {
    firstname: DataUpdated.get("firstname") as string,
    lastname: DataUpdated.get("lastname") as string,
    mail: DataUpdated.get("mail") as string,
    token: Cookies.get("token"),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error updating user", error);
      });
  } catch (error) {
    console.error("Error updating user", error);
  }
};
const deleteUser = async (e: any) => {
  e.preventDefault();
  const userData = {
    token: Cookies.get("token"),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  } catch (error) {
    console.error("Error deleting user", error);
  }
};

const FormularyAccountClient = () => {
  const showModale = (e: any) => {
    e.preventDefault();
    setModaleVisible(true);
  };
  const closeModale = (e: any) => {
    e.preventDefault();
    setModaleVisible(false);
  };
  const [modaleVisible, setModaleVisible] = useState(false);
  const [userData, setUserData] = useState<UserDataType | null>(getUserData());
  return (
    <div className="w-full">
      <form
        className={`flex-column w-1/2 m-auto ${modaleVisible ? "blur-md" : ""}`}
      >
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">Nom</span>
          </div>
          <input
            type="text"
            placeholder="Nom de l'utilisateur"
            className="w-full input input-bordered input-primary "
            defaultValue={userData?.firstname}
          />
        </label>
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">Prénom</span>
          </div>
          <input
            type="text"
            placeholder="Prénom de l'utilisateur "
            className="w-full input input-bordered input-primary "
            defaultValue={userData?.lastname}
          />
        </label>
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">Mail</span>
          </div>
          <input
            type="text"
            placeholder="Mail de l'utilisateur "
            className="w-full input input-bordered input-primary "
            defaultValue={userData?.mail}
          />
        </label>
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">
              Nouveaux mot de passe:
            </span>
          </div>
          <input
            type="password"
            placeholder="mot de passe "
            className="w-full input input-bordered input-primary "
          />
        </label>
        <div className="flex justify-end gap-5 m-5">
          <button className="btn btn-primary">Modifier mes données</button>
          <button className="btn btn-accent" onClick={(e) => showModale(e)}>
            Supprimer mon compte
          </button>
        </div>
      </form>
      <div
        className={`deleteModale fixed  right-1/2 left-1/2 top-1/2 w-1/2 h-1/2 z-50  -translate-y-1/2 ${
          modaleVisible ? "" : "hidden"
        }`}
      >
        <div className="flex-col justify-between w-full h-full gap-3 modal-box">
          <h3 className="m-20 text-lg font-bold">
            Voulez-vous vraiment supprimer votre compte ?{" "}
          </h3>
          <p className="m-10 text-2xl text-center text-primary text-accent">
            Cette action est irrémédiable{" "}
          </p>
          <div className="flex justify-around w-full gap-3">
            <button
              className="btn btn-primary "
              onClick={(e) => closeModale(e)}
            >
              Annuler
            </button>
            <button className="btn btn-accent ">Supprimer mon compte</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularyAccountClient;
