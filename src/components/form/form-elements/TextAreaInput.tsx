"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard title="Textarea input field">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div className="space-y-2">
          <Label htmlFor="textarea-default">Description</Label>
          <Textarea
            id="textarea-default"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
        </div>

        {/* Disabled TextArea */}
        <div className="space-y-2">
          <Label htmlFor="textarea-disabled">Description</Label>
          <Textarea id="textarea-disabled" rows={6} disabled />
        </div>

        {/* Error TextArea */}
        <div className="space-y-2">
          <Label htmlFor="textarea-error">Description</Label>
          <Textarea
            id="textarea-error"
            rows={6}
            value={messageTwo}
            onChange={(e) => setMessageTwo(e.target.value)}
            className="border-destructive focus-visible:ring-destructive"
          />
          <p className="text-sm text-destructive">Please enter a valid message.</p>
        </div>
      </div>
    </ComponentCard>
  );
}
