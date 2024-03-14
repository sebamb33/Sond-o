import { use, useState } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const FormularyAccountClient = () => {
  type UserDataType = {
    firstname?: string;
    lastname?: string;
    mail?: string;
    password?: string;
    token?: string;
  };
  const token = Cookies.get("token");
  const getUserData = () => {
    let userDataString = sessionStorage.getItem("userData");
    if (userDataString) {
      return JSON.parse(userDataString) as UserDataType;
    }
    const userDataEmpty: UserDataType = {} as UserDataType;
    return userDataEmpty;
  };
  const [userDataUpdate, setUserDataUpdate] = useState<UserDataType | null>(
    getUserData()
  );
  const handleFormChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "firstname":
        setUserDataUpdate({ ...userDataUpdate, firstname: value });
        break;
      case "lastname":
        setUserDataUpdate({ ...userDataUpdate, lastname: value });
        break;
      case "mail":
        setUserDataUpdate({ ...userDataUpdate, mail: value });
        break;
      case "password":
        setUserDataUpdate({ ...userDataUpdate, password: value });
        break;
    }
  };
  const updateUser = async (e: any) => {
    e.preventDefault();
    const userData = userDataUpdate;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData, token: token }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error("email déja utilisé");
        }
        throw new Error(
          data.message || "Une erreur est survenue lors de la mise à jour."
        );
      }
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      toast.success("Vos données ont bien été mises à jour");
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
        .then((data) => {})
        .catch((error) => {
          console.error("Error deleting user", error);
        });
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
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
      <Toaster />
      <form
        className={`flex-column w-1/2 m-auto ${modaleVisible ? "blur-md" : ""}`}
      >
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">Nom</span>
          </div>
          <input
            type="text"
            name="firstname"
            placeholder="Nom de l'utilisateur"
            className="w-full input input-bordered input-primary "
            defaultValue={userData?.firstname}
            onChange={handleFormChange}
          />
        </label>
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">Prénom</span>
          </div>
          <input
            type="text"
            name="lastname"
            placeholder="Prénom de l'utilisateur "
            className="w-full input input-bordered input-primary "
            defaultValue={userData?.lastname}
            onChange={handleFormChange}
          />
        </label>
        <label className="w-full form-control ">
          <div className="label">
            <span className="text-2xl label-text text-primary">Mail</span>
          </div>
          <input
            type="text"
            name="mail"
            placeholder="Mail de l'utilisateur "
            className="w-full input input-bordered input-primary "
            defaultValue={userData?.mail}
            onChange={handleFormChange}
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
            name="password"
            placeholder="mot de passe "
            className="w-full input input-bordered input-primary "
            onChange={handleFormChange}
          />
        </label>
        <div className="flex justify-end gap-5 m-5">
          <button className="btn btn-primary" onClick={(e) => updateUser(e)}>
            Modifier mes données
          </button>
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
