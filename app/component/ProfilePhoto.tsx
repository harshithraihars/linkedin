import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ProfilePhoto = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt="profile"/>
    </Avatar>
  );
};

export default ProfilePhoto;
