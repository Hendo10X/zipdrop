import { getUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getUser();

    if (!user) {
        return redirect("/login");
    }

    return(
        <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-80px)] pt-20">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <div className="bg-white p-8 rounded-xl border border-gray-100 w-full max-w-md space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-lg font-medium text-gray-900">{user.name}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg font-medium text-gray-900">{user.email}</p>
                </div>
            </div>
        </div>
    );
}
