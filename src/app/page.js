import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import Home from './components/page';
import Register from './auth/register/page';
// import { CartProvider } from './contextapi/context';

export default async function HomePage() { // Renamed this function
  const session = await getServerSession(authOptions);

  if (session) redirect("/homepage");

  return (
    <main>
      {/* <Home /> */}
      <Register/>
    </main>
  );
}
