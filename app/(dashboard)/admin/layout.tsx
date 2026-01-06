import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-muted/30 flex relative">
            <AdminSidebar />
            <main className="admin-main w-full">
                {children}
            </main>
        </div>
    );
}
