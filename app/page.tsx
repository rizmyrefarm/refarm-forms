import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FORMS, FORM_CATEGORIES } from "@/lib/forms";
import {
  FileText,
  ArrowRight,
  LayoutDashboard,
  ClipboardCheck,
  Truck,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case "assessment":
        return <ClipboardCheck className="w-5 h-5 text-emerald-700" />;
      case "delivery":
        return <Truck className="w-5 h-5 text-emerald-700" />;
      case "monitoring":
        return <Activity className="w-5 h-5 text-emerald-700" />;
      default:
        return <Layers className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2ef]">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0f3d21] via-[#14532d] to-[#1b6b3a] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ReFarm Global · Digital Operations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Lifecycle Forms Platform
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Standardized digital intake, technical assessments, trial protocols, responsibility matrices, and performance monitoring across all project stages.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-5 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Submissions Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Form Categories */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-12">
          {FORM_CATEGORIES.map((cat) => {
            const catForms = FORMS.filter((f) => f.category === cat.key);

            return (
              <section key={cat.key} className="space-y-4">
                {/* Category Header */}
                <div className="border-b-2 border-emerald-600/30 pb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      {getCategoryIcon(cat.key)}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#14532d]">
                        {cat.label}
                      </h2>
                      <p className="text-xs text-[#5b6b60]">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                    {catForms.length} Forms
                  </span>
                </div>

                {/* Form Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catForms.map((form) => (
                    <Link
                      key={form.slug}
                      href={`/${form.slug}`}
                      className="group bg-white rounded-xl p-5 border border-[#d3ded7] shadow-sm hover:shadow-md hover:border-emerald-500 transition flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-semibold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                            {form.slug}
                          </span>
                          {form.duration && (
                            <span className="text-[10.5px] font-medium text-gray-500">
                              {form.duration}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-[#14532d] group-hover:text-emerald-600 transition leading-snug">
                          {form.title}
                        </h3>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {form.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-900">
                        <span>Open Blank Form</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#d3ded7] py-6 text-center text-xs text-[#5b6b60]">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} ReFarm Global. Internal Operations & Trial Protocol Platform.</p>
        </div>
      </footer>
    </div>
  );
}
