import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PetPortions",
  description: "Sign in to your PetPortions account",
};

export default function LoginPage() {
  return <SignInForm />;
}

