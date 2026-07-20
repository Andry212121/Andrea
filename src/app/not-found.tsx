import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-navy-950 px-6 text-center text-white">
      <p className="font-serif-display text-7xl font-medium text-gold-400">404</p>
      <h1 className="mt-4 font-serif-display text-2xl font-medium sm:text-3xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-navy-100/80">
        The page you&apos;re looking for may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="gold">
          Back to homepage
        </Button>
        <Button href="/find-a-tutor" variant="outline-light">
          Find a tutor
        </Button>
      </div>
    </section>
  );
}
