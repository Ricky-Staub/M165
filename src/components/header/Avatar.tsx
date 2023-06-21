import Image from "next/image";

import useSession from "@api/session";

export default function Avatar() {
  const session = useSession();

  const avatarContent = () => {
    if (session.user?.profileImage) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src={session.user.profileImage}
            alt={`${session.user.firstName} ${session.user.lastName}`}
            width={40}
            height={40}
            className="rounded-circle"
          />
        </div>
      );
    } else {
      const initials = `${session.user?.firstName
        .charAt(0)
        .toUpperCase()}${session.user?.lastName.charAt(0).toUpperCase()}`;

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.5rem",
            }}
          >
            {initials}
          </div>
        </div>
      );
    }
  };

  return <>{avatarContent()}</>;
}
