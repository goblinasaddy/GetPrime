import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, GitBranch, Star, Bug, Lightbulb, MessageSquare, HelpCircle, PlusCircle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { aboutConfig } from "@/config/about";

export const metadata = {
  title: "About & Contribute — GetPrime",
  description:
    "Learn about GetPrime, the open TCS NQT practice platform built by a student for students. Find out how to contribute, report issues, and support the project.",
};

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
  disabled?: boolean;
}

function ActionCard({ icon, label, description, href, disabled }: ActionCardProps) {
  return (
    <a
      href={disabled ? undefined : href}
      target={disabled ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`group flex items-start gap-4 p-4 rounded-lg border border-slate-200 bg-white transition-all ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-primary/40 hover:shadow-sm cursor-pointer"
      }`}
    >
      <span className="mt-0.5 text-primary">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
          {label}
        </span>
        <span className="text-xs text-slate-500">{description}</span>
      </div>
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 border-b border-blue-900 shadow-sm flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">GetPrime</span>
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-200 hover:text-white hover:bg-blue-800 border border-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 space-y-8">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            About &amp; Contribute
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            A student-built platform for TCS NQT practice.
          </p>
        </div>

        {/* ─── 1. About GetPrime ────────────────────────────── */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              About GetPrime
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              GetPrime is an open, free-to-use practice platform designed to
              help students prepare for the TCS National Qualifier Test (NQT)
              through realistic, full-length mock tests.
            </p>
            <p>
              The platform replicates the real TCS NQT interface — section
              navigation, time pressure, question types, and scoring — so that
              practice feels exactly like the real exam. No shortcuts, no
              inflated scores. Just honest preparation.
            </p>
            <p>
              The question bank is built from actual TCS NQT patterns, covers
              all sections (Numerical, Logical, Verbal, and Advanced Reasoning),
              and is continuously improving with community contributions.
            </p>
          </CardContent>
        </Card>

        {/* ─── 2. About the Creator ─────────────────────────── */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              About the Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />{" "}
              by{" "}
              <span className="font-bold text-slate-800">
                {aboutConfig.creatorName}
              </span>
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {aboutConfig.creatorBio}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {aboutConfig.githubUrl && (
                <a
                  href={aboutConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-primary transition-colors"
                >
                  <GitBranch className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {aboutConfig.linkedinUrl && (
                <a
                  href={aboutConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-700 hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {aboutConfig.portfolioUrl && (
                <a
                  href={aboutConfig.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-700 hover:text-primary transition-colors"
                >
                  Portfolio
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ─── 3. Help Improve GetPrime ─────────────────────── */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              Help Improve GetPrime
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-2.5">
            <p className="text-xs text-slate-500 pb-1">
              Every report and suggestion makes GetPrime better for everyone.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <ActionCard
                icon={<MessageSquare className="w-4 h-4" />}
                label="Provide Feedback"
                description="General thoughts on the platform"
                href={aboutConfig.feedbackFormUrl}
                disabled={!aboutConfig.feedbackFormUrl}
              />
              <ActionCard
                icon={<Bug className="w-4 h-4" />}
                label="Report a Bug"
                description="Something broken or not working right?"
                href={aboutConfig.bugReportUrl}
                disabled={!aboutConfig.bugReportUrl}
              />
              <ActionCard
                icon={<HelpCircle className="w-4 h-4" />}
                label="Report a Wrong Answer"
                description="Spotted an incorrect question or explanation?"
                href={aboutConfig.wrongQuestionReportUrl}
                disabled={!aboutConfig.wrongQuestionReportUrl}
              />
              <ActionCard
                icon={<PlusCircle className="w-4 h-4" />}
                label="Suggest a New Question"
                description="Have a good NQT-style question to contribute?"
                href={aboutConfig.suggestQuestionUrl}
                disabled={!aboutConfig.suggestQuestionUrl}
              />
              <ActionCard
                icon={<Lightbulb className="w-4 h-4" />}
                label="Suggest a Feature"
                description="An idea that could improve the platform?"
                href={aboutConfig.featureRequestUrl}
                disabled={!aboutConfig.featureRequestUrl}
                
              />
            </div>
          </CardContent>
        </Card>

        {/* ─── 4. Support the Project ───────────────────────── */}
        {aboutConfig.showSupportSection && (
          <Card className="bg-white border-border shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-800">
                Support the Project
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              {/* GitHub Star */}
              {aboutConfig.githubUrl && (
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-400 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Star the GitHub Repository
                      </p>
                      <p className="text-xs text-slate-500">
                        It helps others discover the project.
                      </p>
                    </div>
                  </div>
                  <a
                    href={aboutConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="shrink-0 font-semibold border-slate-300">
                      <Star className="w-3.5 h-3.5 mr-1.5 text-yellow-500 fill-yellow-400" />
                      Star
                    </Button>
                  </a>
                </div>
              )}

              {/* UPI QR */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="relative w-36 h-36 rounded-md overflow-hidden border border-amber-300 shrink-0 bg-white">
                  <Image
                    src={aboutConfig.upiQrImagePath}
                    alt="UPI QR Code"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <Coffee className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-bold text-amber-800">
                      Buy me a Claude Sip
                    </span>
                  </div>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    If GetPrime helped you crack your placement tests, you can
                    support future development with a small contribution. Even
                    ₹10 goes a long way. ☕
                  </p>
                  {aboutConfig.upiId && (
                    <p className="text-xs font-mono text-amber-800 bg-amber-100 px-2 py-1 rounded w-fit mx-auto sm:mx-0">
                      UPI: {aboutConfig.upiId}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ─── 5. Open Source ───────────────────────────────── */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-2 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              Open Source
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              GetPrime is an open project. If you're a developer, student, or
              just someone who cares about quality placement prep, you're
              welcome to contribute.
            </p>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {[
                "Improve the question bank",
                "Report mistakes in questions or explanations",
                "Suggest new features or improvements",
                "Help document the codebase",
                "Spread the word to fellow students",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-primary text-xs">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {aboutConfig.githubUrl && (
              <a
                href={aboutConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 font-semibold border-slate-300 gap-2"
                >
                  <GitBranch className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
