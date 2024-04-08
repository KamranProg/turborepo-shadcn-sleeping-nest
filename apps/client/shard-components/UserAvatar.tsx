import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

interface Props {
  src?: string;
  fallbackText: string;
}

function UserAvatar({ src, fallbackText }: Props) {
  return (
    <Avatar>
      <AvatarImage src={src || ""} />
      <AvatarFallback className="uppercase">{fallbackText}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
