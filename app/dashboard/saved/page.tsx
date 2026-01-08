import { SavedAddressList } from "@/components/SavedAddressList";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl sm:max-w-7xl">
        <SavedAddressList />
      </div>
    </div>
  );
}
