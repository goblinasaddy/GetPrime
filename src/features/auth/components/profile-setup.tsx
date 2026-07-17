"use client";

import React, { useState } from "react";
import { updateProfile } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProfileSetupProps {
  profile: {
    displayName: string | null;
    email: string;
  };
}

export function ProfileSetup({ profile }: ProfileSetupProps) {
  const [displayName, setDisplayName] = useState(profile.displayName || "");
  const [college, setCollege] = useState("");
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !college.trim() || !graduationYear.trim()) {
      setError("All fields are required");
      return;
    }

    const year = parseInt(graduationYear);
    if (isNaN(year) || year < 2020 || year > 2035) {
      setError("Please enter a valid graduation year (e.g. 2026)");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await updateProfile({
        displayName,
        college,
        graduationYear: year,
      });
      // Page will automatically revalidate and hide modal
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-border shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-xl font-bold text-primary">Complete Your Profile</CardTitle>
            <CardDescription className="text-slate-500">
              Please provide details to configure your TCS NQT test papers.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {error && (
              <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded">
                {error}
              </div>
            )}
            <div className="space-y-1">
              <label htmlFor="displayName" className="text-xs font-semibold text-slate-700">
                Display Name
              </label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="college" className="text-xs font-semibold text-slate-700">
                College / University
              </label>
              <Input
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Amity University"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="graduationYear" className="text-xs font-semibold text-slate-700">
                Graduation Year
              </label>
              <Input
                id="graduationYear"
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="e.g. 2026"
                min="2020"
                max="2035"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4 border-t border-border">
            <Button type="submit" disabled={loading} className="w-full h-11 font-semibold">
              {loading ? "Saving Details..." : "Save and Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
