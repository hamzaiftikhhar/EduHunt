// import { auth } from "@/lib/auth";
import { Card } from "@/components";
import { Mail, User } from "lucide-react";

export default async function ProfilePage() {
  // TODO: Implement proper session retrieval when auth is ready
  // const session = await auth();

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
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Account Information</h2>
            </div>
            <div>
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
                    defaultValue="Demo User"
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
                    defaultValue="user@eduhunt.app"
                    disabled
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Status */}
        <Card>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Account Status</h3>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Status</p>
                <p className="mt-1 w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Active
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Member Since</p>
                <p className="mt-1 text-sm text-slate-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
