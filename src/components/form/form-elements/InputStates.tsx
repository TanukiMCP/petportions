"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputStates() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  return (
    <ComponentCard
      title="Input States"
      desc="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div className="space-y-2">
          <Label htmlFor="email-error">Email</Label>
          <Input
            id="email-error"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={error ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {error && (
            <p className="text-sm text-destructive">This is an invalid email address.</p>
          )}
        </div>

        {/* Success Input */}
        <div className="space-y-2">
          <Label htmlFor="email-success">Email</Label>
          <Input
            id="email-success"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={!error && email ? "border-green-500 focus-visible:ring-green-500" : ""}
          />
          {!error && email && (
            <p className="text-sm text-green-600 dark:text-green-400">Valid email!</p>
          )}
        </div>

        {/* Disabled Input */}
        <div className="space-y-2">
          <Label htmlFor="email-disabled">Email</Label>
          <Input
            id="email-disabled"
            type="text"
            defaultValue="disabled@example.com"
            disabled={true}
            placeholder="Disabled email"
          />
          <p className="text-sm text-muted-foreground">This field is disabled.</p>
        </div>
      </div>
    </ComponentCard>
  );
}
