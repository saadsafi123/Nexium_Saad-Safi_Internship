// app/(main)/about/page.tsx

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">About DishGen</h1>
        <p className="text-lg text-muted-foreground">
          DishGen is an AI-powered recipe generator designed to help you create delicious meals from the ingredients you already have.
        </p>
        <div>
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p className="mt-2">
            Simply enter your ingredients, set your preferences, and let our AI chef craft a custom recipe for you. You can save your favorite recipes to your personal collection and explore what others in the community are creating.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Technology</h2>
          <p className="mt-2">
            This app is built with Next.js, ShadCN UI, Tailwind CSS, Supabase for the database, and n8n for the AI workflow automation.
          </p>
        </div>
      </div>
    </div>
  )
}