import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, FileText, PenLine, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Create Perfect Prompts with{" "}
                  <span className="text-primary">TurboPrompt</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The easiest way to create, save, and reuse AI prompts with
                  customizable templates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/templates/new">
                  <Button size="lg" className="h-12 px-6">
                    Create Your First Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="h-12 px-6">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything You Need for Perfect Prompts
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  TurboPrompt makes it easy to create, manage, and use AI
                  prompts with powerful features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <PenLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Customizable Templates</h3>
                <p className="text-center text-muted-foreground">
                  Create reusable templates with placeholders that can be filled
                  in later for consistent prompts.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Form-Based Filling</h3>
                <p className="text-center text-muted-foreground">
                  Fill in your templates with an intuitive form interface,
                  making it easy to generate perfect prompts.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Copy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">One-Click Copy</h3>
                <p className="text-center text-muted-foreground">
                  Copy your generated prompts to the clipboard with a single
                  click, ready to use anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple 3-Step Process
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get started with TurboPrompt in just three easy steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Create a Template</h3>
                <p className="text-center text-muted-foreground">
                  Design your prompt template with placeholders for variable
                  content using our intuitive editor.
                </p>
              </div>
              {/* Step 2 */}
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">Fill in the Form</h3>
                <p className="text-center text-muted-foreground">
                  When you need to use the template, simply fill in the form
                  fields with your specific content.
                </p>
              </div>
              {/* Step 3 */}
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Copy and Use</h3>
                <p className="text-center text-muted-foreground">
                  Generate your prompt with one click and copy it to use with
                  any AI tool or platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  What Our Users Say
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover how TurboPrompt is helping users create better AI
                  prompts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
              {/* Testimonial 1 */}
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    &quot;TurboPrompt has completely transformed how I interact
                    with AI. I can create consistent, high-quality prompts in
                    seconds instead of minutes.&quot;
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Content Creator
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    &quot;The template system is brilliant. I&apos;ve created
                    templates for different types of content, and it saves me
                    hours every week.&quot;
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">
                      Product Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Turbocharge Your Prompts?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of users who are creating better AI prompts
                  with TurboPrompt.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signin">
                  <Button size="lg" variant="secondary" className="h-12 px-6">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background px-4 md:px-6">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">TurboPrompt</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TurboPrompt. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
