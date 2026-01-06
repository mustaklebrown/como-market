import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Mock Stats - In a real app, fetch these from DB
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1% from last month",
            icon: DollarSign,
        },
        {
            title: "Subscriptions",
            value: "+2350",
            change: "+180.1% from last month",
            icon: Users,
        },
        {
            title: "Sales",
            value: "+12,234",
            change: "+19% from last month",
            icon: ShoppingBag,
        },
        {
            title: "Active Now",
            value: "+573",
            change: "+201 since last hour",
            icon: TrendingUp,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Overview of your store's performance.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="rounded-xl border-border/50 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 rounded-xl border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 rounded-xl border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            You made 265 sales this month.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Mock Recent Sales */}
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Minh Nhat</p>
                                        <p className="text-sm text-muted-foreground">
                                            nhat@example.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$1,999.00</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
