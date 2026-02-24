import { LogoutButton } from "./LogoutButton";

export default async function Header() {
  return (
    <div className="border-b border-gray-200 flex justify-end h-10">
      <LogoutButton />
    </div>
  );
}
