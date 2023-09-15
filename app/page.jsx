import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="gotham_gradient text-center">AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        An open-source AI-powered prompt tool to discover, create, and share
        modern and creative prompts.
      </p>

      <Feed />
    </section>
  );
}
