import { isSet } from "util/types";

export default function navigationUserData(user: any) {
  if (user) {
    return (
      <div className="navigationUserData">
        <div className="userPictureProfile"></div>
        <div className="userName"></div>
      </div>
    );
  }
}
