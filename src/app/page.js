import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Home from './components/page';

export default async function HomePage() { // Renamed this function
  const session = await getServerSession(authOptions);

  if (session) redirect("/components");

  return (
    <main>
      <Home />
    </main>
  );
}
