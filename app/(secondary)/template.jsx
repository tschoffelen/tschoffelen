import Header from "@/components/Header";

export default function Template({ children }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
