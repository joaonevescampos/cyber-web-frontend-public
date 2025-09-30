import { SignIn } from "@clerk/clerk-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="mt-[88px] h-[calc(100vh-88px)] flex flex-col gap-8 items-center justify-center">
        <h1 className="font-semibold text-xl px-4 text-center max-w-[400px]">
          To continue and make your purchase safely you must sign in to Cyber
          ​​Web!
        </h1>
        <SignIn fallbackRedirectUrl="/payment" />
      </main>
      <Footer />
    </>
  );
}
