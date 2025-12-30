import { auth } from "@/lib/auth";
import { Card, CardHeader, CardBody } from "@/components";
import { Mail, User } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-lg text-slate-600">Manage your account</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-900">Account Information</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </div>
                  </label>
                  <input
                    type="text"
                    value={session?.user?.name || ""}
                    disabled
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </label>
                  <input
                    type="email"
                    value={session?.user?.email || ""}
                    disabled
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 disabled:opacity-60"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-slate-900">Account Status</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Status</p>
                <p className="mt-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 w-fit">
                  Active
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Member Since</p>
                <p className="mt-1 text-sm text-slate-900">
                  {session?.user ? new Date().toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
