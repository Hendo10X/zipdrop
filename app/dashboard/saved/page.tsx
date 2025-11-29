import { SavedAddressList } from "@/components/SavedAddressList";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <SavedAddressList />
      </div>
    </div>
  );
}
