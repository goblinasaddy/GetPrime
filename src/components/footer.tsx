import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { aboutConfig } from "@/config/about";

export function Footer() {
  const creatorLink =
    aboutConfig.linkedinUrl || aboutConfig.portfolioUrl || null;

  return (
    <footer className="w-full border-t border-slate-100 bg-white py-5 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-1.5">
        <p className="text-sm text-slate-600 flex items-center gap-1.5">
          Built with{" "}
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by{" "}
          {creatorLink ? (
            <a
              href={creatorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {aboutConfig.creatorName}
            </a>
          ) : (
            <span className="font-semibold text-slate-700">
              {aboutConfig.creatorName}
            </span>
          )}
        </p>

        <p className="text-xs text-slate-400">{aboutConfig.creatorSubtitle}</p>

        <Link
          href="/about"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/5 hover:border-primary/60 transition-colors rounded-md px-4 py-1.5"
        >
          About &amp; Contribute
        </Link>
      </div>
    </footer>
  );
}
