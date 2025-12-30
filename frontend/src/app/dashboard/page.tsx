import { auth } from "@/lib/auth";
import { Card, CardHeader, CardBody } from "@/components";
import { BookOpen, Clock, Award } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const stats = [
    {
      icon: BookOpen,
      label: "Courses Enrolled",
      value: "0",
      color: "primary",
    },
    {
      icon: Clock,
      label: "Learning Hours",
      value: "0h",
      color: "secondary",
    },
    {
      icon: Award,
      label: "Certificates",
      value: "0",
      color: "primary",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Welcome back, {session?.user?.name || session?.user?.email}!
        </h1>
        <p className="text-lg text-slate-600">Track your learning progress here</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hoverable>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 text-${stat.color}-600`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-slate-900">Your Courses</h2>
        </CardHeader>
        <CardBody>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <p className="text-slate-600">No courses enrolled yet</p>
              <p className="text-sm text-slate-500">
                Start exploring to find your next course
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
