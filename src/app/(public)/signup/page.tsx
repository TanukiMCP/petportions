import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | PetPortions",
  description: "Create a new PetPortions account",
};

export default function SignUpPage() {
  return <SignUpForm />;
}

