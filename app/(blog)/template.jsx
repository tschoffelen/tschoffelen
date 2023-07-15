import Header from "@/components/Header";

export default function Template({ children }) {
  return (
    <main>
      <Header />
      <div className="p-8 md:p-16 pb-20 md:pb-32 max-w-[50rem] mx-auto text-gray-800">
        {children}
      </div>
    </main>
  );
}
