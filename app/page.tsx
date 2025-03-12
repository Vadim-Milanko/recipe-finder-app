import SearchForm from '@/app/components/SearchForm/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <SearchForm />
      </div>
    </div>
  );
}
